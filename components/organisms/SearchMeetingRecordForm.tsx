import React, { useEffect, useState } from 'react'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { SearchMeetingRecordInputs, SelectBox } from '@/interfaces/form/inputs'
import { SearchBaseForm } from '@/components/organisms'
import { MeetingRecord } from '@/interfaces/models'
import { Pager } from '@/interfaces/common'
import SearchIcon from '@material-ui/icons/Search'
import { SortParam } from '@/interfaces/table'
import { MeetingTableRowData } from '@/interfaces/table/rowData'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxHeight: {
      [theme.breakpoints.down('xs')]: {
        height: 350,
      },
    },
    searchIcon: {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
    subFlag: {
      color: theme.palette.text.secondary,
      '& .MuiTypography-body1': {
        fontSize: theme.typography.body2.fontSize,
      },
    },
  })
)
export type Props = {
  req: (
    data: SearchMeetingRecordInputs
  ) => Promise<Pager<MeetingRecord, SearchMeetingRecordInputs>>
  onSuccess: (res: Pager<MeetingRecord, SearchMeetingRecordInputs>) => void
  yearMonth: SelectBox[] | null
  initialParams: {
    [k in
      | keyof SearchMeetingRecordInputs
      | keyof SortParam<MeetingTableRowData>]: string
  }
  currentTotalCount: number
}
const SearchMeetingRecordForm = ({
  req,
  onSuccess,
  yearMonth,
  initialParams,
  currentTotalCount = 0,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<SearchMeetingRecordInputs>({
    mode: 'onChange',
    defaultValues: {
      count: 'null',
      meeting_date: 'null',
      keyword: '',
      only_bookmark: false,
      only_me: false,
    },
  })

  const classes = useStyles()
  const checkboxFields = ['only_me', 'only_bookmark']
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearch = async (data: SearchMeetingRecordInputs) => {
    setLoading(true)
    await req(data)
      .then((res) => {
        onSuccess(res)
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleChange = async (
    key: string,
    e: React.ChangeEvent<{
      name?: string | undefined
      value: string | boolean | unknown
    }>
  ) => {
    if (checkboxFields.includes(key)) {
      setValue(key, getValues(key) === '1' ? '0' : '1')
    } else {
      setValue(key, String(e.target.value))
    }
    await handleSearch(getValues())
  }

  const handleClear = async () => {
    reset()
    await handleSearch(getValues())
  }

  const isActive = (key: string) =>
    checkboxFields.includes(key) && getValues(key) === '1'

  useEffect(() => {
    let isMounted = true
    ;(
      Object.keys(initialParams) as (
        | keyof SearchMeetingRecordInputs
        | keyof SortParam<MeetingTableRowData>
      )[]
    ).forEach((key) => {
      if (key in getValues() && isMounted) {
        setValue(String(key), initialParams[key])
      }
    })
    return () => {
      isMounted = false
    }
  }, [initialParams])

  return (
    <div>
      <SearchBaseForm
        currentTotalCount={currentTotalCount}
        loading={loading}
        onClear={handleClear}
        onSubmit={handleSubmit(handleSearch)}
        classes={{ boxHeight: classes.boxHeight }}
      >
        <Grid item xs={12}>
          <Grid container spacing={1} alignItems={'center'}>
            <Grid item>
              <Controller
                control={control}
                name="only_me"
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={
                      <Checkbox
                        checked={isActive('only_me')}
                        name="only_me"
                        color="primary"
                        size={'small'}
                        onChange={handleChange.bind(null, 'only_me')}
                      />
                    }
                    label="自分が参加した会議のみ表示"
                    className={classes.subFlag}
                  />
                )}
              />
            </Grid>
            <Grid item>
              <Controller
                control={control}
                name="only_bookmark"
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={
                      <Checkbox
                        checked={isActive('only_bookmark')}
                        name="only_bookmark"
                        color="primary"
                        size={'small'}
                        onChange={handleChange.bind(null, 'only_bookmark')}
                      />
                    }
                    label="ブックマークのみ表示"
                    className={classes.subFlag}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sm={3} lg={2}>
          <InputLabel shrink id="meeting-date-select-label">
            開催年月
          </InputLabel>
          <Controller
            name="meeting_date"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                labelId="meeting-date-select-label"
                id="meeting_date"
                name="meeting_date"
                fullWidth
                onChange={handleChange.bind(null, 'meeting_date')}
              >
                <MenuItem value={'null'}>指定なし</MenuItem>
                {yearMonth !== null &&
                  yearMonth.map((item, index) => (
                    <MenuItem value={item.value} key={`item_${index}`}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            )}
          />
        </Grid>
        <Grid item xs={6} sm={3} lg={2}>
          <FormControl fullWidth>
            <InputLabel shrink id="count-select-label">
              参加人数
            </InputLabel>
            <Controller
              name="count"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="count-select-label"
                  id="count"
                  name="count"
                  fullWidth
                  onChange={handleChange.bind(null, 'count')}
                >
                  <MenuItem value={'null'}>指定なし</MenuItem>
                  <MenuItem value={'2,5'}>2〜5人</MenuItem>
                  <MenuItem value={'6,10'}>6〜10人</MenuItem>
                  <MenuItem value={'11,15'}>11〜15人</MenuItem>
                  <MenuItem value={'16,20'}>16〜20人</MenuItem>
                  <MenuItem value={'21'}>21人〜</MenuItem>
                </Select>
              )}
            />
          </FormControl>{' '}
        </Grid>
        <Grid item xs={12} sm={6} lg={8}>
          <Grid container spacing={2} alignItems={'center'}>
            <Grid item style={{ flexGrow: 1 }}>
              <Controller
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    required
                    placeholder="会議名、開催場所etc"
                    id="keyword"
                  />
                )}
                name="keyword"
                control={control}
              />
            </Grid>
            <Grid item>
              <Tooltip title={'検索する'}>
                <IconButton
                  onClick={handleSubmit(handleSearch)}
                  color={'inherit'}
                  className={classes.searchIcon}
                  size={'small'}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </SearchBaseForm>
    </div>
  )
}

export default SearchMeetingRecordForm
