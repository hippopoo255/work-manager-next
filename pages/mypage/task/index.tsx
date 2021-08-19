import React, { useState, useCallback } from 'react'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { FormDialog } from '@/components/organisms'
import { Typography } from '@material-ui/core'
import { Grid, DialogContentText, TextField } from '@material-ui/core'
import { InputLabel, Select, MenuItem } from '@material-ui/core'
import { DateTimeInput } from '@/components/molecules'
import { useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
// import { ErrorMessage } from '@hookform/error-message';
import { postRequest, putRequest } from '@/api'
import { httpClient } from '@/api/useApi'
import requests from '@/Requests'
import { Pager, AlertStatus } from '@/interfaces'
import { Task, Priority, Progress } from '@/interfaces/models'
import { toStrData } from '@/lib/util'
import { TaskTable } from '@/components/organisms'
import { AxiosError, AxiosResponse } from 'axios'
import { CustomAlert } from '@/components/atoms'
import { FormErrorMessage } from '@/components/atoms'
import { useRouter } from 'next/router'
import { API_URL } from '@/lib/util'
export type Inputs = {
  body: string
  time_limit: Date
  progress_id: number
  priority_id: number
}

const Index = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [updateFlag, setUpdateFlag] = useState<number | null>(null)
  const [priorityList, setPriorityList] = useState<Priority[]>([])
  const [progressList, setProgressList] = useState<Progress[]>([])
  const [tasks, setTasks] = useState<Pager<Task> | any>([])
  const [userId, setUserId] = useState<number>(0)
  const [lastUri, setLastUri] = useState<string>(requests.task.mytask)
  const router = useRouter()
  // TODO: 状態管理すべき
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    severity: 'error',
    variant: 'filled',
    msg: '',
    show: false,
  })

  useEffect(() => {
    const init = async () => {
      await httpClient
        .get(requests.priority.list)
        .then((res) => setPriorityList(res.data))
      await httpClient
        .get(requests.progress.list)
        .then((res) => setProgressList(res.data))
      await httpClient
        .get(requests.task.mytask)
        .then((res) => setTasks(res.data))
    }
    init()
  }, [])

  const calc = alertStatus.show

  useEffect(() => {
    setTimeout(() => {
      setAlertStatus((prev) => ({
        ...prev,
        show: false,
      }))
    }, 5000)
  }, [calc])

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      body: '',
      time_limit: new Date(),
      progress_id: 1,
      priority_id: 1,
    },
  })

  const add = useCallback(
    (isOpen: boolean) => {
      reset()
      setUpdateFlag(null)
      setOpen(isOpen)
    },
    [reset]
  )

  const edit = (id: number) => {
    const i: number = tasks.data.findIndex((task: Task) => task.id === id)
    setUpdateFlag(tasks.data[i].id)
    setValue('body', tasks.data[i].body)
    setValue('time_limit', new Date(tasks.data[i].time_limit))
    setValue('priority_id', tasks.data[i].priority_id)
    setValue('progress_id', tasks.data[i].progress_id)
    setOpen(true)
  }

  const handleSave: SubmitHandler<Inputs> = async (data) => {
    if (!!updateFlag) {
      await save(data)
    } else {
      await save(data)
    }
  }

  const save = async (data: Inputs) => {
    const taskData: FormData = new FormData()
    taskData.append('body', data.body)
    taskData.append('time_limit', toStrData(data.time_limit))
    taskData.append('owner_id', String(userId))
    taskData.append('priority_id', String(data.priority_id))
    taskData.append('progress_id', String(data.progress_id))
    if (!!updateFlag) {
      await putRequest<Task, FormData>(
        requests.task.put + `/${updateFlag}`,
        taskData,
        (err) => {
          if (err.status === 401) {
            router.push('/login')
          }
          if (err.status === 403) {
            router.push('/403', '/forbidden')
          }
          throw err
        }
      )
        .then((task) => {
          const i = tasks.data.findIndex((t: Task) => t.id === task.id)
          tasks.data.splice(i, 1, task)
          const newTasks = {
            ...tasks,
            data: [...tasks.data],
          }
          setTasks(newTasks)
          setOpen(false)
          setAlertStatus((prev) => ({
            ...prev,
            msg: '更新しました',
            severity: 'success',
            show: true,
          }))
        })
        .catch((err: AxiosResponse) => {
          if (err.status === 422) {
            setAlertStatus((prev) => ({
              ...prev,
              msg: 'データ形式が正しくありません',
              severity: 'error',
              show: true,
            }))
            console.error(err)
          }
          return false
        })
    } else {
      await postRequest<Task, FormData>(requests.task.post, taskData, (err) => {
        if (err.status === 422) {
          setAlertStatus((prev) => ({
            ...prev,
            msg: 'データ形式が正しくありません',
            severity: 'error',
            show: true,
          }))
          console.error(err)
        }
        throw err
      })
        .then((task: Task) => {
          const newData = [task, ...tasks.data]
          newData.splice(10, 1)
          const newTasks = {
            ...tasks,
            total: tasks.total + 1,
            data: [...newData],
          }
          setTasks(newTasks)
          setOpen(false)
          setAlertStatus((prev) => ({
            ...prev,
            msg: '保存しました',
            severity: 'success',
            show: true,
          }))
        })
        .catch((err: AxiosError) => {
          // setError()
          return false
        })
    }
  }

  const handleChangePage = async (
    event: React.MouseEvent<unknown> | React.ChangeEvent<unknown>,
    args: any
  ) => {
    if (args.hasOwnProperty('sort_key')) {
      let uri = tasks.path.replace(API_URL, '')
      uri += `?page=${args.page}&sort_key=${args.sort_key}&order_by=${args.order_by}`
      await httpClient.get(uri).then((res) => {
        setTasks(res.data)
        setLastUri(uri)
      })
    }
  }

  const handleDelete = async (ids: number[]) => {
    const data: { ids: number[] } = { ids }
    await httpClient
      .delete(lastUri, {
        data,
      })
      .then((res) => {
        setTasks(res.data)
        setAlertStatus((prev) => ({
          ...prev,
          msg: '削除しました',
          severity: 'error',
          show: true,
        }))
      })
  }

  return (
    <MypageLayout title="タスク" supplyUserId={setUserId}>
      <div className="container">
        <MypageTitle>タスク</MypageTitle>
        <section>
          <FormDialog
            onSubmit={handleSubmit(handleSave)}
            dialogTitle={!!updateFlag ? 'タスクの更新' : 'タスクの新規登録'}
            open={open}
            setOpen={setOpen}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      autoFocus
                      id="body"
                      label="タスクの内容"
                      type="text"
                      required
                      fullWidth
                      error={!!errors.body}
                    />
                  )}
                  name="body"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: {
                      value: true,
                      message: 'タスクの内容は必須です',
                    },
                    maxLength: {
                      value: 80,
                      message: 'タスクの内容は80文字以内で入力してください',
                    },
                  }}
                />
                <p style={{ minHeight: 20 }}>
                  {!!errors.body && (
                    <FormErrorMessage msg={errors.body.message} />
                  )}
                </p>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="time_limit"
                  defaultValue={new Date()}
                  rules={{
                    required: {
                      value: true,
                      message: '期限日時は必須です',
                    },
                  }}
                  control={control}
                  render={({ field }) => (
                    <DateTimeInput
                      {...field}
                      required
                      disablePast
                      label="期限日時"
                      error={!!errors.time_limit}
                    />
                  )}
                />
                <p style={{ minHeight: 20 }}>
                  {!!errors.time_limit && (
                    <FormErrorMessage msg={errors.time_limit.message} />
                  )}
                </p>
              </Grid>
              <Grid item xs={6}>
                <InputLabel shrink id="priority-id-select-label">
                  優先度
                </InputLabel>
                <Controller
                  name="priority_id"
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="priority-id-select-label"
                      id="priority_id"
                      name="priority_id"
                      fullWidth
                    >
                      {priorityList.map((priority) => (
                        <MenuItem key={priority.id} value={priority.id}>
                          {priority.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel shrink id="progress-id-select-label">
                  進捗度
                </InputLabel>
                <Controller
                  name="progress_id"
                  control={control}
                  defaultValue={1}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="progress-id-select-label"
                      id="progress_id"
                      name="progress_id"
                      fullWidth
                    >
                      {progressList.map((progress) => (
                        <MenuItem key={progress.id} value={progress.id}>
                          {progress.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </Grid>
            </Grid>
          </FormDialog>
          <TaskTable
            tasks={tasks}
            onPage={handleChangePage}
            onAdd={add}
            onEdit={edit}
            onDelete={handleDelete}
          />
        </section>
        <CustomAlert {...alertStatus} />
      </div>
    </MypageLayout>
  )
}

export default Index
