import React, { useEffect } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Button,
  Grid,
  Tooltip,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { SearchTaskInputs } from '@/interfaces/form/inputs'
import { Task, Priority, Progress } from '@/interfaces/models'
import { Pager } from '@/interfaces/common'
import { TaskTableRowData } from '@/interfaces/table/rowData'
import { SortParam } from '@/interfaces/table'
import { customColor } from '@/assets/color/basic'

const useStyles = makeStyles((theme: Theme) => ({
  linkDanger: {
    color: customColor.red,
  },
  linkDangerActive: {
    backgroundColor: customColor.red,
    color: theme.palette.common.white,
    borderColor: customColor.red,
    '&:hover': {
      color: customColor.red,
    },
  },
  linkWarning: {
    color: theme.palette.warning.main,
  },
  linkWarningActive: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.white,
    borderColor: theme.palette.warning.main,
    '&:hover': {
      color: theme.palette.warning.main,
    },
  },
}))

export type Props = {
  req: (data: SearchTaskInputs) => Promise<Pager<Task>>
  onSearchSuccess: (res: Pager<Task>) => void
  initialParams: {
    [k in keyof SearchTaskInputs | keyof SortParam<TaskTableRowData>]: string
  }
  priorityList: Priority[]
  progressList: Progress[]
}

const SearchTaskForm = ({
  req,
  onSearchSuccess,
  initialParams,
  priorityList,
  progressList,
}: Props) => {
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<SearchTaskInputs>({
    mode: 'onChange',
    defaultValues: {
      progress_id: 'null',
      priority_id: 'null',
      status: '',
    },
  })

  const handleSearch = async (data: SearchTaskInputs) => {
    await req(data)
      .then((res) => {
        onSearchSuccess(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleChange = async (
    key: string,
    e: React.ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    setValue(key, String(e.target.value))
    await handleSearch(getValues())
  }

  const handleStatusClick = async (
    status: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setValue('status', getReformdStatus(status))
    await handleSearch(getValues())
  }

  const statusArray = () => {
    if (!initialParams.status) {
      return []
    } else {
      return initialParams.status.split(',')
    }
  }

  const handleClear = async () => {
    reset()
    await handleSearch(getValues())
  }

  const hasStatus = (status: string) => {
    const currentStatus = statusArray()
    return currentStatus.indexOf(status) !== -1
  }

  const getReformdStatus = (status: string) => {
    const currentStatus = statusArray()
    const index = currentStatus.findIndex((item) => item === status)
    if (index !== -1) {
      currentStatus.splice(index, 1)
      return currentStatus.join()
    }
    const newStatus = currentStatus.concat([status])
    return newStatus.join()
  }

  const dangerClass = hasStatus('over')
    ? classes.linkDangerActive
    : classes.linkDanger
  const warningClass = hasStatus('warning')
    ? classes.linkWarningActive
    : classes.linkWarning

  useEffect(() => {
    let isMounted = true
    ;(
      Object.keys(initialParams) as (
        | keyof SearchTaskInputs
        | keyof SortParam<TaskTableRowData>
      )[]
    ).forEach((k) => {
      if (k in getValues() && isMounted) {
        setValue(String(k), initialParams[k])
      }
    })
    return () => {
      isMounted = false
    }
  }, [initialParams])

  return (
    <div>
      <form noValidate onSubmit={handleSubmit(handleSearch)}>
        <Grid container alignItems="flex-end" spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item>
                <Tooltip
                  title={hasStatus('over') ? '絞り込み解除' : '絞り込む'}
                >
                  <Button
                    variant={'outlined'}
                    className={dangerClass}
                    onClick={handleStatusClick.bind(null, 'over')}
                    color={'inherit'}
                    size={'small'}
                  >
                    期限経過
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip
                  title={hasStatus('warning') ? '絞り込み解除' : '絞り込む'}
                >
                  <Button
                    variant={'outlined'}
                    className={warningClass}
                    onClick={handleStatusClick.bind(null, 'warning')}
                    color={'inherit'}
                    size={'small'}
                  >
                    期限間近
                  </Button>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={4} lg={3}>
            <InputLabel shrink id="priority-id-select-label">
              優先度
            </InputLabel>
            <Controller
              name="priority_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="priority-id-select-label"
                  id="priority_id"
                  name="priority_id"
                  fullWidth
                  onChange={handleChange.bind(null, 'priority_id')}
                >
                  <MenuItem value={'null'}>指定なし</MenuItem>
                  {!!priorityList.length &&
                    priorityList.map((priority, index) => (
                      <MenuItem value={priority.id} key={`priority_${index}`}>
                        {priority.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={3}>
            <InputLabel shrink id="progress-id-select-label">
              進捗度
            </InputLabel>
            <Controller
              name="progress_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="progress-id-select-label"
                  id="progress_id"
                  name="progress_id"
                  fullWidth
                  onChange={handleChange.bind(null, 'progress_id')}
                >
                  <MenuItem value={'null'}>指定なし</MenuItem>
                  {!!progressList.length &&
                    progressList.map((progress, index) => (
                      <MenuItem value={progress.id} key={`progress_${index}`}>
                        {progress.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          </Grid>
          <Grid item>
            <Button
              variant={'outlined'}
              color={'primary'}
              size={'small'}
              onClick={handleClear}
            >
              検索クリア
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default SearchTaskForm
