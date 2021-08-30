import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MypageLayout } from '@/layouts'
import { CustomAlert, MypageTitle } from '@/components/atoms'
import { AddButton } from '@/components/molecules'
import { CommonTable, SearchTaskForm } from '@/components/organisms'
import { TaskForm } from '@/components/template'
import { requestUri, getRequest, deleteRequest } from '@/api'
import { Pager, AlertStatus } from '@/interfaces/common'
import { SortParam } from '@/interfaces/table'
import { TaskTableRowData } from '@/interfaces/table/rowData'
import { Task, Priority, Progress } from '@/interfaces/models'
import { TaskInputs, SearchTaskInputs } from '@/interfaces/form/inputs'
import { handlePageUri } from '@/lib/util'
import { AxiosResponse } from 'axios'
import { createRows, headCells } from '@/lib/table/task'

const Index = () => {
  const router = useRouter()
  const [defaultValues, setDefaultValues] = useState<TaskInputs>({
    body: '',
    time_limit: new Date(),
    progress_id: 1,
    priority_id: 1,
  })
  const [tasks, setTasks] = useState<Pager<Task, SearchTaskInputs> | null>(null)
  const [rows, setRows] = useState<TaskTableRowData[]>([])
  const [userId, setUserId] = useState<number>(0)
  const [latestUri, setLatestUri] = useState<string>(requestUri.task.myTask)
  const [priorityList, setPriorityList] = useState<Priority[]>([])
  const [progressList, setProgressList] = useState<Progress[]>([])

  const [open, setOpen] = useState<boolean>(false)
  const [updateFlag, setUpdateFlag] = useState<number | null>(null)
  // TODO: 状態管理すべき
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    severity: 'error',
    variant: 'filled',
    msg: '',
    show: false,
  })

  const add = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setDefaultValues({
      body: '',
      time_limit: new Date(),
      progress_id: 1,
      priority_id: 1,
    })
    setUpdateFlag(null)
    setOpen(true)
  }

  const edit = (id: number) => {
    if (tasks !== null) {
      const i: number = tasks.data.findIndex((task: Task) => task.id === id)
      setUpdateFlag(tasks.data[i].id)
      setDefaultValues({
        body: tasks.data[i].body,
        time_limit: new Date(tasks.data[i].time_limit),
        priority_id: tasks.data[i].priority_id,
        progress_id: tasks.data[i].progress_id,
      })
      setOpen(true)
    }
  }

  const handleSuccess = (task: Task) => {
    if (!!updateFlag) {
      if (tasks !== null) {
        const i = tasks.data.findIndex((t: Task) => t.id === task.id)
        tasks.data.splice(i, 1, task)
        const newTasks = {
          ...tasks,
          data: [...tasks.data],
        }
        setTasks(newTasks)
        setRows(createRows(newTasks.data))
      }
      setOpen(false)
      setAlertStatus((prev) => ({
        ...prev,
        msg: '更新しました',
        severity: 'success',
        show: true,
      }))
    } else {
      const newData = tasks !== null ? [task, ...tasks.data] : [task]
      newData.splice(10, 1)
      setTasks((prev) => {
        if (prev !== null) {
          return {
            ...prev,
            total: prev.total + 1,
            data: [...newData],
          }
        }
        return null
      })
      setOpen(false)
      setAlertStatus((prev) => ({
        ...prev,
        msg: '保存しました',
        severity: 'success',
        show: true,
      }))
      setRows(createRows(newData))
    }
  }

  const handleFail = (err: AxiosResponse) => {
    if (err.status === 422) {
      setAlertStatus((prev) => ({
        ...prev,
        msg: 'データ形式が正しくありません',
        severity: 'error',
        show: true,
      }))
    }
    return false
  }

  const slicedSortKeys = () => {
    const isSorting = latestUri.match(/[?&]sort_key=.+&order_by=.+/g)
    return !isSorting ? '' : isSorting[0].replace(/^[?]sort_key/, '&sort_key')
  }

  const getSortParams = (data: SearchTaskInputs) => {
    let queryParamStr = '?'
    Object.keys(data).forEach((key) => {
      if (!(data[key] === 'null' || !data[key])) {
        queryParamStr += `&${key}=${data[key]}`
      }
    })
    queryParamStr += slicedSortKeys()
    queryParamStr = queryParamStr.replace(/^\?&/, '?')
    return queryParamStr
  }

  const handleSearch = async (data: SearchTaskInputs) => {
    let path = requestUri.task.myTask + getSortParams(data)
    setLatestUri(path)
    return await getRequest<Pager<Task, SearchTaskInputs>>(path)
  }

  const handleSearchSuccess = (res: Pager<Task, SearchTaskInputs>) => {
    setTasks(res)
    setRows(createRows(res.data))
  }

  const handlePage = async (
    event:
      | React.MouseEvent<unknown>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | null,
    args: SortParam<TaskTableRowData>
  ) => {
    if (args.hasOwnProperty('sort_key') && tasks !== null) {
      const uri = handlePageUri(latestUri, args)
      await getRequest<Pager<Task, SearchTaskInputs>>(uri).then((res) => {
        setTasks(res)
        setLatestUri(uri)
        setRows(createRows(res.data))
      })
    }
  }

  const handleDeleteClick = async (ids: number[]) => {
    const data: { ids: number[] } = { ids }
    // const queryParams = latestUri.match(/\?.+$/)
    await deleteRequest<Pager<Task, SearchTaskInputs>>(latestUri, {
      data,
    }).then((res) => {
      setTasks(res)
      setAlertStatus((prev) => ({
        ...prev,
        msg: '削除しました',
        severity: 'error',
        show: true,
      }))
      setRows(createRows(res.data))
    })
  }

  useEffect(() => {
    const init = async () => {
      let initialQuery = ''
      if (!!Object.keys(router.query).length) {
        initialQuery =
          '?' +
          Object.keys(router.query)
            .map((key) => `${key}=${router.query[key]}`)
            .join('&')
      }
      const path = requestUri.task.myTask + initialQuery
      await getRequest<Pager<Task, SearchTaskInputs>>(path).then((res) => {
        setTasks(res)
        setLatestUri(path)
        setRows(createRows(res.data))
      })
    }
    init()
  }, [router])

  const calc = alertStatus.show

  useEffect(() => {
    setTimeout(() => {
      setAlertStatus((prev) => ({
        ...prev,
        show: false,
      }))
    }, 5000)
  }, [calc])

  useEffect(() => {
    const init = async () => {
      await getRequest<Priority[]>(requestUri.priority.list).then((res) =>
        setPriorityList(res)
      )
      await getRequest<Progress[]>(requestUri.progress.list).then((res) =>
        setProgressList(res)
      )
    }
    init()
  }, [])

  return (
    <MypageLayout title="タスク" supplyUserId={setUserId}>
      <div className="container">
        <MypageTitle>タスク</MypageTitle>
        <section>
          <TaskForm
            defaultValues={defaultValues}
            updateFlag={updateFlag}
            onSaveSuccess={handleSuccess}
            onSaveFail={handleFail}
            ownerId={userId}
            open={open}
            setOpen={setOpen}
            priorityList={priorityList}
            progressList={progressList}
          />
          {tasks !== null && (
            <CommonTable
              headCells={headCells}
              onDelete={handleDeleteClick}
              onEdit={edit}
              onPage={handlePage}
              pagerData={tasks}
              rows={rows}
              title="タスク一覧"
              multiSelect
            >
              <SearchTaskForm
                onSearchSuccess={handleSearchSuccess}
                req={handleSearch}
                priorityList={priorityList}
                progressList={progressList}
                initialParams={
                  tasks !== null && !!tasks.query_params
                    ? tasks.query_params
                    : {}
                }
              />
            </CommonTable>
          )}
        </section>
        <AddButton onClick={add} title="タスクを追加する" />
        <CustomAlert {...alertStatus} />
      </div>
    </MypageLayout>
  )
}

export default Index
