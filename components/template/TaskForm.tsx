import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '@/provider/AuthProvider'
import {
  Grid,
  TextField,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import { toStrData } from '@/lib/util'
// import Stepper from '@material-ui/core/Stepper'
import { FormErrorMessage } from '@/components/atoms'
import { DateTimeInput } from '@/components/molecules'
import { FormDialog } from '@/components/organisms'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { TaskInputs } from '@/interfaces/form/inputs'
import { Priority, Progress, Task } from '@/interfaces/models'
import { AxiosResponse } from 'axios'
import { requestUri } from '@/api'
import { useAuth, useRestApi } from '@/hooks'

type Props = {
  defaultValues: TaskInputs
  updateFlag: number | null
  onSaveSuccess: (task: Task) => void
  onSaveFail: (err: AxiosResponse) => void
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  progressList: Progress[]
  priorityList: Priority[]
}

const TaskForm = React.memo(
  ({
    defaultValues,
    updateFlag,
    onSaveSuccess,
    onSaveFail,
    open,
    setOpen,
    progressList,
    priorityList,
  }: Props) => {
    // react hook form
    const [loading, setLoading] = useState<boolean>(false)
    const { auth } = useAuth()
    const { postMethod, putMethod } = useRestApi()
    const {
      handleSubmit,
      control,
      setValue,
      getValues,
      formState: { errors },
    } = useForm<TaskInputs>({
      defaultValues,
    })

    const handleSave: SubmitHandler<TaskInputs> = async (data) => {
      await save(data)
    }

    const save = async (data: TaskInputs) => {
      setLoading(true)
      const submitData: FormData = new FormData()
      submitData.append('body', data.body)
      submitData.append('time_limit', toStrData(data.time_limit))
      submitData.append('owner_id', String(auth.user.id))
      submitData.append('priority_id', String(data.priority_id))
      submitData.append('progress_id', String(data.progress_id))

      await req(submitData)
        .then((task) => {
          onSaveSuccess(task)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    const req = async (taskData: FormData) => {
      if (!!updateFlag) {
        return await putMethod<Task, FormData>(
          requestUri.task.put + `/${updateFlag}`,
          taskData,
          onSaveFail
        )
      } else {
        return await postMethod<Task, FormData>(
          requestUri.task.post,
          taskData,
          onSaveFail
        )
      }
    }

    useEffect(() => {
      ;(Object.keys(defaultValues) as (keyof TaskInputs)[]).forEach((key) => {
        setValue(key, defaultValues[key])
      })
    }, [defaultValues])

    return (
      <FormDialog
        onSubmit={handleSubmit(handleSave)}
        dialogTitle={!!updateFlag ? 'タスクの更新' : 'タスクの新規登録'}
        open={open}
        setOpen={setOpen}
        isCircular
        loading={loading}
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
              {!!errors.body && <FormErrorMessage msg={errors.body.message} />}
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
              defaultValue={getValues('priority_id')}
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
              defaultValue={getValues('progress_id')}
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
    )
  }
)

export default TaskForm
