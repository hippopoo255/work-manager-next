import React, { useState } from 'react'
import { MypageLayout } from '@/layouts'
import { FormDialog } from '@/components/organisms'
import { Grid, DialogContentText, TextField } from '@material-ui/core'
import { DateTimeInput } from '@/components/molecules'
import { InputLabel, Select, MenuItem } from '@material-ui/core'
import { useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useApi, postRequest } from '@/api'
import { httpClient } from '@/api/useApi'
import requests from '@/Requests'
import { TaskModel, Priority, Progress } from '@/interfaces'
import { toStrData } from '@/lib/util'

export type Inputs = {
  body: string
  time_limit: Date
  progress_id: number
  priority_id: number
}

const Index = () => {
  const priorityReq = () => {
    return httpClient.get(requests.priority.list)
  }
  const priorityList = useApi<Priority[]>(priorityReq, [])
  const progressReq = () => {
    return httpClient.get(requests.progress.list)
  }
  const progressList = useApi<Progress[]>(progressReq, [])

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await store(data)
  }

  const store = async (data: Inputs) => {
    console.log(toStrData(data.time_limit))
    const taskData = new FormData()
    taskData.append('body', data.body)
    taskData.append('time_limit', toStrData(data.time_limit))
    taskData.append('owner_id', '1')
    taskData.append('priority_id', String(data.priority_id))
    taskData.append('progress_id', String(data.progress_id))
    const task = await postRequest<Promise<TaskModel>>(
      requests.task.post,
      taskData
    )

    console.log(task)
  }

  return (
    <MypageLayout title="タスク">
      <h2>タスク</h2>
      <section>
        <FormDialog
          buttonText="＋"
          onSubmit={handleSubmit(onSubmit)}
          dialogTitle="タスクの新規登録"
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
                  />
                )}
                name="body"
                control={control}
                defaultValue=""
                rules={{ required: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="time_limit"
                defaultValue={new Date()}
                control={control}
                render={({ field }) => (
                  <DateTimeInput {...field} label="期日" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel id="priority-id-select-label">優先度</InputLabel>
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
              <InputLabel id="progress-id-select-label">進捗度</InputLabel>
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
      </section>
    </MypageLayout>
  )
}

export default Index
