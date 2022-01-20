import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AxiosResponse } from 'axios'
import { MypageLayout } from '@/layouts'
import { CustomAlert, MypageTitle } from '@/components/atoms'
import { AddButton } from '@/components/molecules'
import { CommonTable, SearchTaskForm, SearchBox } from '@/components/organisms'
import { TaskForm } from '@/components/template'
import { requestUri } from '@/api'
import { useAuth, useInitialConnector, useRestApi } from '@/hooks'
import { Pager, AlertStatus } from '@/interfaces/common'
import { SortParam } from '@/interfaces/table'
import { TaskTableRowData } from '@/interfaces/table/rowData'
import { Task, Priority, Progress } from '@/interfaces/models'
import { TaskInputs, SearchTaskInputs } from '@/interfaces/form/inputs'
import { handlePageUri } from '@/lib/util'
import { createRows, headCells } from '@/lib/table/task'
import { initialAlertStatus } from '@/lib/initialData'

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
  const [latestUri, setLatestUri] = useState<string>(requestUri.task.myTask)
  const [priorityList, setPriorityList] = useState<Priority[]>([])
  const [progressList, setProgressList] = useState<Progress[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [updateFlag, setUpdateFlag] = useState<number | null>(null)
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    ...initialAlertStatus,
  })
  const { getMethod, deleteMethod } = useRestApi()
  const { auth, config } = useAuth()
  const {} = useInitialConnector<Progress[]>({
    path: requestUri.progress.list,
    onSuccess: (res) => setProgressList(res),
  })
  const {} = useInitialConnector<Priority[]>({
    path: requestUri.priority.list,
    onSuccess: (res) => setPriorityList(res),
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

  const edit = (id?: number | string) => {
    if (tasks !== null) {
      const i: number = tasks.data.findIndex((task: Task) => task.id === id)
      if (i >= 0) {
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
  }

  const handleAlertClose = () => {
    setAlertStatus((prev) => ({
      ...prev,
      show: false,
    }))
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
    setLoading(true)
    let path = requestUri.task.myTask + getSortParams(data)
    setLatestUri(path)
    return await getMethod<Pager<Task, SearchTaskInputs>>(path).finally(() => {
      setLoading(false)
    })
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
      setLoading(true)
      const uri = handlePageUri(latestUri, args)
      await getMethod<Pager<Task, SearchTaskInputs>>(uri)
        .then((res) => {
          setTasks(res)
          setLatestUri(uri)
          setRows(createRows(res.data))
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const handleDeleteClick = async (ids: (number | string)[]) => {
    const data: { ids: (number | string)[] } = { ids }
    // const queryParams = latestUri.match(/\?.+$/)
    await deleteMethod<Pager<Task, SearchTaskInputs>>(latestUri, {
      data,
      ...config,
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
      setLoading(true)
      let initialQuery = ''
      if (!!Object.keys(router.query).length) {
        initialQuery =
          '?' +
          Object.keys(router.query)
            .map((key) => `${key}=${router.query[key]}`)
            .join('&')
      }
      const path = requestUri.task.myTask + initialQuery
      if (auth.isLogin) {
        await getMethod<Pager<Task, SearchTaskInputs>>(path)
          .then((res) => {
            setTasks(res)
            setLatestUri(path)
            setRows(createRows(res.data))
          })
          .finally(() => {
            setLoading(false)
          })
      }
    }
    init()
  }, [router, auth])

  const calc = alertStatus.show

  useEffect(() => {
    setTimeout(() => {
      setAlertStatus((prev) => ({
        ...prev,
        show: false,
      }))
    }, 5000)
  }, [calc])

  return (
    <MypageLayout title="タスク">
      <div className="container">
        <MypageTitle>タスク</MypageTitle>
      </div>
      <section className="container">
        <TaskForm
          defaultValues={defaultValues}
          updateFlag={updateFlag}
          onSaveSuccess={handleSuccess}
          onSaveFail={handleFail}
          open={open}
          setOpen={setOpen}
          priorityList={priorityList}
          progressList={progressList}
        />
        <CommonTable
          headCells={headCells}
          onDelete={handleDeleteClick}
          onEdit={edit}
          onPage={handlePage}
          pagerData={tasks}
          rows={rows}
          title="タスク一覧"
          fetching={loading}
          multiSelect
        >
          <SearchBox
            position={{
              position: 'absolute',
              top: 12,
              right: 16,
            }}
            formContent={
              <SearchTaskForm
                currentTotalCount={tasks !== null ? tasks.total : 0}
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
            }
          />
        </CommonTable>
      </section>
      <AddButton onClick={add} title="タスクを追加する" />
      <CustomAlert alertStatus={alertStatus} onClose={handleAlertClose} />
    </MypageLayout>
  )
}

export default Index
