import React, { useEffect } from 'react'
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { SearchMeetingRecordInputs, SelectBox } from '@/interfaces/form/inputs'
import { MeetingRecord } from '@/interfaces/models'
import { Pager } from '@/interfaces/common'
import SearchIcon from '@material-ui/icons/Search'
import { SortParam } from '@/interfaces/table'
import { MeetingTableRowData } from '@/interfaces/table/rowData'

export type Props = {
  classes: any
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
}
const SearchMeetingRecordForm = ({
  classes,
  req,
  onSuccess,
  yearMonth,
  initialParams,
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
      only_me: false,
    },
  })

  const handleSearch = async (data: SearchMeetingRecordInputs) => {
    await req(data)
      .then((res) => {
        onSuccess(res)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const handleChange = async (
    key: string,
    e: React.ChangeEvent<{
      name?: string | undefined
      value: string | boolean | unknown
    }>
  ) => {
    if (key === 'only_me') {
      setValue(key, getValues('only_me') === '1' ? '0' : '1')
    } else {
      setValue(key, String(e.target.value))
    }
    await handleSearch(getValues())
  }

  const isActive = () => getValues('only_me') === '1'

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
      <form noValidate onSubmit={handleSubmit(handleSearch)}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name="only_me"
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  control={
                    <Checkbox
                      checked={isActive()}
                      name="only_me"
                      color="primary"
                      size={'small'}
                      onChange={handleChange.bind(null, 'only_me')}
                    />
                  }
                  label="自分の参加した会議に限定"
                  className={classes.subFlag}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={4} lg={2}>
            <InputLabel shrink id="meeting-date-select-label">
              年月選択
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
          <Grid item xs={6} md={4} lg={2}>
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel shrink id="count-select-label">
                人数選択
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
          <Grid item xs={12} md={4}>
            <Grid container spacing={2} className={classes.keywordBar}>
              <Grid item sm={10}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      margin="dense"
                      required
                      placeholder="キーワード"
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
                    className={classes.SearchIcon}
                    size={'small'}
                  >
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default SearchMeetingRecordForm
