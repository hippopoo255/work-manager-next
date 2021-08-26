import React from 'react'
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@material-ui/core'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { SearchMeetingRecordInputs } from '@/interfaces/form/inputs'
import { MeetingRecord } from '@/interfaces/models'
import { Pager } from '@/interfaces'
import SearchIcon from '@material-ui/icons/Search'

export type Props = {
  // defaultValues: SearchMeetingRecordInputs
  classes: any
  req: (data: SearchMeetingRecordInputs) => Promise<Pager<MeetingRecord>>
  onSuccess: (res: Pager<MeetingRecord>) => void
}
const SearchMeetingRecordForm = ({ classes, req, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SearchMeetingRecordInputs>({
    mode: 'onChange',
    defaultValues: {
      count: 'null',
      meeting_date: 'null',
      keyword: '',
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

  return (
    <div>
      <form noValidate onSubmit={handleSubmit(handleSearch)}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs={6} md={3}>
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
                >
                  <MenuItem value={'null'}>指定なし</MenuItem>
                  <MenuItem value={'2021/07'}>2021年7月</MenuItem>
                  <MenuItem value={'2021/06'}>2021年6月</MenuItem>
                  <MenuItem value={'2021/05'}>2021年5月</MenuItem>
                  <MenuItem value={'2021/04'}>2021年4月</MenuItem>
                </Select>
              )}
            />
          </Grid>
          <Grid item xs={6} md={3}>
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
                    labelId="priority-id-select-label"
                    id="count"
                    name="count"
                    fullWidth
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
          <Grid item xs={10}>
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
          <Grid>
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
      </form>
    </div>
  )
}

export default SearchMeetingRecordForm
