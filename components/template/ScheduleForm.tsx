import React, { useState, useEffect, useMemo } from 'react'
import { FormDialog } from '@/components/organisms'
import { useForm, Controller } from 'react-hook-form'
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Chip,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date'
import { ScheduleInputs, MemberExtInputs } from '@/interfaces/form/inputs'
import { ScheduleSubmit } from '@/interfaces/form/submit'
import { User, Schedule } from '@/interfaces/models'
import { getRequest, requestUri } from '@/api'
import { FormErrorMessage } from '@/components/atoms'
import { DateTimeInput } from '@/components/molecules'
import { CustomMenuBox } from '@/components/organisms'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { toStrData } from '@/lib/util'
import { scheduleColors } from '@/lib/fullCalendar'

const useStyles = makeStyles({
  label: {
    width: 16,
    height: 16,
    borderRadius: 9999,
    marginRight: 8,
    display: 'inline-block',
    verticalAlign: 'middle',
  },
})
export type Props = {
  defaultValues: ScheduleInputs
  fixedMember: MemberExtInputs[]
  sharedBy: number
  open: boolean
  setOpen: (isOpen: boolean) => void
  req: (submitData: ScheduleSubmit) => Promise<Schedule>
  onSuccess: (response: Schedule) => void
  saveAction: 'create' | 'update'
  dialogTitle: string
  onDelete: (id: number) => void
}
const ScheduleForm = ({
  defaultValues,
  fixedMember,
  sharedBy,
  open,
  setOpen,
  req,
  onSuccess,
  saveAction,
  dialogTitle,
  onDelete,
}: Props) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [memberList, setMemberList] = useState<MemberExtInputs[]>([])
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm<ScheduleInputs>({
    defaultValues,
  })
  const selectedMembers = watch('sharedMembers', fixedMember)
  const router = useRouter()

  useEffect(() => {
    const fetchMember = async () => {
      await getRequest<User[]>(requestUri.user.list).then((users: User[]) => {
        const dataList: MemberExtInputs[] = users.map((u) => ({
          id: u.id,
          full_name: u.full_name,
          is_editable: true,
          shared_by: sharedBy,
        }))
        setMemberList(dataList)
      })
    }
    fetchMember()
  }, [])

  useEffect(() => {
    if (!!defaultValues.id) {
      setValue('id', defaultValues.id)
    } else {
      setValue('id', undefined)
    }
    setValue('title', defaultValues.title)
    setValue('memo', defaultValues.memo)
    setValue('color', defaultValues.color)
    setValue('start', defaultValues.start)
    setValue('end', defaultValues.end)
    setValue('is_public', defaultValues.is_public)
    setValue('disabled', defaultValues.disabled)
    setValue('scheduled_by', defaultValues.scheduled_by)
    setValue('sharedMembers', defaultValues.sharedMembers)
  }, [setValue, defaultValues])

  const options = useMemo(
    () => [
      {
        text: '削除',
        danger: true,
        disabled: defaultValues.disabled,
        onClick: (id: number) => onDelete(id),
      },
    ],
    [defaultValues]
  )

  const handleMembers = (
    event: React.ChangeEvent<{}>,
    newValue: MemberExtInputs[]
  ) => {
    setValue('sharedMembers', [
      ...fixedMember,
      ...newValue.filter(
        (option: MemberExtInputs) => fixedMember.indexOf(option) === -1
      ),
    ])
    if (newValue.length > 0) {
      clearErrors('sharedMembers')
    }
  }

  const handleStart = (
    d: MaterialUiPickersDate,
    value?: string | null | undefined
  ) => {
    if (d !== null) {
      const diff = new Date(d).getTime() - getValues('start').getTime()
      setValue('start', d)
      setValue('end', new Date(getValues('end').getTime() + diff))
    }
    if (d !== null && getValues('end') < d) {
      setValue('end', d)
    }
  }

  const handleEnd = (
    d: MaterialUiPickersDate,
    value?: string | null | undefined
  ) => {
    if (d !== null && getValues('start').getTime() > d.getTime()) {
      const diff = new Date(d).getTime() - getValues('end').getTime()
      setValue('start', new Date(getValues('start').getTime() + diff))
    }
    if (d !== null) {
      setValue('end', d)
    }
  }

  const handleCheck = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(
      'sharedMembers',
      selectedMembers.map((member: MemberExtInputs) => {
        if (member.id === id) {
          member.is_editable = !member.is_editable
        }
        return member
      })
    )
  }

  const handleSave = async (data: ScheduleInputs) => {
    setLoading(true)
    const submitMember: ScheduleSubmit['sharedMembers'] = {}
    data.sharedMembers.forEach((member) => {
      submitMember[member.id] = {
        is_editable: !!member.is_editable,
        shared_by: sharedBy,
      }
    })
    const submitData = {
      scheduled_by: data.scheduled_by,
      title: data.title,
      memo: data.memo,
      start: toStrData(data.start),
      end: toStrData(data.end),
      color: data.color,
      is_public: data.is_public,
      sharedMembers: submitMember,
    }
    await req(submitData)
      .then((newSchedule) => {
        setOpen(false)
        reset()
        onSuccess(newSchedule)
      })
      .catch((err) => {
        if (err.status === 422) {
          const errBody: { [k: string]: string[] } = err.data.errors
          Object.keys(errBody).forEach((key) => {
            setError(key, {
              type: 'invalid',
              message: errBody[key][0],
            })
          })
        } else if (err.status === 401) {
          router.push('/login')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        dialogTitle={dialogTitle}
        onSubmit={handleSubmit(handleSave)}
        isCircular
        loading={loading}
        disabled={getValues('disabled')}
      >
        <Grid container spacing={3}>
          {getValues('disabled') && (
            <Grid item xs={12}>
              <Typography
                color={'error'}
                component={'strong'}
                variant={'body2'}
              >
                編集権限がありません
              </Typography>
            </Grid>
          )}
          {!!getValues('id') && (
            <Grid
              container
              justifyContent={'flex-end'}
              xs={12}
              style={{ padding: 8 }}
            >
              <Grid item xs={2} sm={1}>
                <CustomMenuBox options={options} id={getValues('id') || 0} />
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <Controller
              name="title"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: '内容は必須です',
                },
                maxLength: {
                  value: 140,
                  message: '内容は140文字以内で入力してください',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  label="内容"
                  placeholder={'140字以内'}
                  variant="outlined"
                  error={!!errors.title}
                  fullWidth
                  disabled={getValues('disabled')}
                />
              )}
            />
            <p style={{ minHeight: 20 }}>
              {!!errors.title && (
                <FormErrorMessage msg={errors.title.message} />
              )}
            </p>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="start"
              defaultValue={getValues('start')}
              rules={{
                required: {
                  value: true,
                  message: '開始日時は必須です',
                },
              }}
              control={control}
              render={({ field }) => (
                <DateTimeInput
                  {...field}
                  required
                  label="開始日時"
                  error={!!errors.start}
                  disabled={getValues('disabled')}
                  onChange={handleStart}
                />
              )}
            />
            <p style={{ minHeight: 20 }}>
              {!!errors.start && (
                <FormErrorMessage msg={errors.start.message} />
              )}
            </p>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="end"
              defaultValue={getValues('end')}
              rules={{
                required: {
                  value: true,
                  message: '終了日時は必須です',
                },
              }}
              control={control}
              render={({ field }) => (
                <DateTimeInput
                  {...field}
                  required
                  label="終了日時"
                  error={!!errors.end}
                  disabled={getValues('disabled')}
                  minDate={getValues('start')}
                  onChange={handleEnd}
                />
              )}
            />
            <p style={{ minHeight: 20 }}>
              {!!errors.end && <FormErrorMessage msg={errors.end.message} />}
            </p>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="is_public"
              control={control}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  name="is_public"
                  id="is_public"
                  color="primary"
                  checked={getValues('is_public')}
                  disabled={getValues('disabled')}
                />
              )}
            />
            <label htmlFor="is_public" style={{ cursor: 'pointer' }}>
              公開する
            </label>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="color">カラー</InputLabel>
                  <Select
                    {...field}
                    labelId="color-select-label"
                    id="color"
                    name="color"
                    label="カラー"
                    fullWidth
                    value={getValues('color')}
                    disabled={getValues('disabled')}
                  >
                    {scheduleColors.map((color) => (
                      <MenuItem key={color.value} value={color.value}>
                        <span
                          className={classes.label}
                          style={{ background: color.value }}
                        ></span>
                        {color.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="sharedMembers"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  id="schedule_members_field"
                  options={memberList}
                  value={selectedMembers}
                  defaultValue={getValues('sharedMembers')}
                  onChange={handleMembers}
                  getOptionLabel={(option) => option.full_name}
                  disabled={getValues('disabled')}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        key={`member_${index}`}
                        label={option.full_name}
                        {...getTagProps({ index })}
                        disabled={fixedMember.indexOf(option) !== -1}
                      />
                    ))
                  }
                  style={{
                    width: '100%',
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="共有者"
                      variant="outlined"
                      placeholder="＋"
                      error={!!errors.sharedMembers}
                    />
                  )}
                />
              )}
            />
            <p style={{ minHeight: 20 }}>
              {!!errors.sharedMembers && (
                <FormErrorMessage
                  msg={
                    /* @ts-ignore */
                    errors.sharedMembers.message
                  }
                />
              )}
            </p>
          </Grid>
          <Grid item xs={12}>
            {selectedMembers.length > 0 &&
              selectedMembers.map((member) => (
                <FormControlLabel
                  key={member.id}
                  control={
                    <Checkbox
                      checked={member.is_editable!}
                      onChange={handleCheck.bind(null, member.id)}
                      name="member"
                      color="primary"
                      disabled={getValues('disabled')}
                    />
                  }
                  label={`${member.full_name}さんに編集権限を付与する`}
                />
              ))}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="memo"
              control={control}
              rules={{
                maxLength: {
                  value: 140,
                  message: 'メモは140文字以内で入力してください',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="メモ"
                  variant="outlined"
                  multiline
                  minRows={3}
                  maxRows={8}
                  error={!!errors.memo}
                  fullWidth
                  placeholder={'140字以内'}
                  disabled={getValues('disabled')}
                />
              )}
            />
            <p style={{ minHeight: 20 }}>
              {!!errors.memo && <FormErrorMessage msg={errors.memo.message} />}
            </p>
          </Grid>
        </Grid>
      </FormDialog>
    </>
  )
}

ScheduleForm.propTypes = {
  saveAction: PropTypes.string,
  dialogTitle: PropTypes.string,
}

ScheduleForm.defaultProps = {
  saveAction: 'update',
  dialogTitle: 'スケジュールを追加',
}

export default ScheduleForm
