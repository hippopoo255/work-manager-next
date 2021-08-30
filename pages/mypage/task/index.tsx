import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { MypageLayout } from '@/layouts'
import { CustomAlert, FormErrorMessage, MypageTitle } from '@/components/atoms'
import { DateTimeInput } from '@/components/molecules'
import { FormDialog, TaskTable } from '@/components/organisms'
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  requestUri,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '@/api'
import { Pager } from '@/interfaces/common'
import { AlertStatus } from '@/interfaces/common'
import { Task, Priority, Progress } from '@/interfaces/models'
import { TaskInputs } from '@/interfaces/form/inputs'
import { toStrData, API_URL } from '@/lib/util'
import { AxiosResponse } from 'axios'

const Index = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [updateFlag, setUpdateFlag] = useState<number | null>(null)
  const [priorityList, setPriorityList] = useState<Priority[]>([])
  const [progressList, setProgressList] = useState<Progress[]>([])
  const [tasks, setTasks] = useState<Pager<Task> | null>(null)
  const [userId, setUserId] = useState<number>(0)
  const [lastUri, setLastUri] = useState<string>(requestUri.task.mytask)
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
      await getRequest<Priority[]>(requestUri.priority.list).then((res) =>
        setPriorityList(res)
      )
      await getRequest<Progress[]>(requestUri.progress.list).then((res) =>
        setProgressList(res)
      )
      await getRequest<Pager<Task>>(requestUri.task.mytask).then((res) =>
        setTasks(res)
      )
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
  } = useForm<TaskInputs>({
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
    if (tasks !== null) {
      const i: number = tasks.data.findIndex((task: Task) => task.id === id)
      setUpdateFlag(tasks.data[i].id)
      setValue('body', tasks.data[i].body)
      setValue('time_limit', new Date(tasks.data[i].time_limit))
      setValue('priority_id', tasks.data[i].priority_id)
      setValue('progress_id', tasks.data[i].progress_id)
      setOpen(true)
    }
  }

  const handleSave: SubmitHandler<TaskInputs> = async (data) => {
    if (!!updateFlag) {
      await save(data)
    } else {
      await save(data)
    }
  }

  const save = async (data: TaskInputs) => {
    const taskData: FormData = new FormData()
    taskData.append('body', data.body)
    taskData.append('time_limit', toStrData(data.time_limit))
    taskData.append('owner_id', String(userId))
    taskData.append('priority_id', String(data.priority_id))
    taskData.append('progress_id', String(data.progress_id))
    if (!!updateFlag) {
      await putRequest<Task, FormData>(
        requestUri.task.put + `/${updateFlag}`,
        taskData
      )
        .then((task) => {
          if (tasks !== null) {
            const i = tasks.data.findIndex((t: Task) => t.id === task.id)
            tasks.data.splice(i, 1, task)
            const newTasks = {
              ...tasks,
              data: [...tasks.data],
            }
            setTasks(newTasks)
          }
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
      await postRequest<Task, FormData>(requestUri.task.post, taskData)
        .then((task: Task) => {
          setTasks((prev) => {
            if (prev !== null) {
              const newData = [task, ...prev.data]
              newData.splice(10, 1)
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
          throw err
        })
    }
  }

  const handleChangePage = async (
    event: React.MouseEvent<unknown> | React.ChangeEvent<unknown>,
    args: any
  ) => {
    if (args.hasOwnProperty('sort_key') && tasks !== null) {
      let uri = tasks.path.replace(API_URL, '')
      uri += `?page=${args.page}&sort_key=${args.sort_key}&order_by=${args.order_by}`
      await getRequest<Pager<Task>>(uri).then((res) => {
        setTasks(res)
        setLastUri(uri)
      })
    }
  }

  const handleDelete = async (ids: number[]) => {
    const data: { ids: number[] } = { ids }
    await deleteRequest<Pager<Task>>(lastUri, null, { data }).then((res) => {
      setTasks(res)
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
          {tasks !== null && (
            <TaskTable
              tasks={tasks}
              onPage={handleChangePage}
              onAdd={add}
              onEdit={edit}
              onDelete={handleDelete}
            />
          )}
        </section>
        <CustomAlert {...alertStatus} />
      </div>
    </MypageLayout>
  )
}

export default Index
