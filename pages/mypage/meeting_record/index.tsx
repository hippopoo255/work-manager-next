import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { CommonTable } from '@/components/organisms'
import { AddButton } from '@/components/molecules'
import { httpClient } from '@/api/useApi'
import requests from '@/Requests'
import { Pager } from '@/interfaces'
import { HeadCell, TableRowData, QueryParam } from '@/interfaces/table'
import { MeetingRecord } from '@/interfaces/models'
import { toStrLabel } from '@/lib/util'
import { Typography, Tooltip } from '@material-ui/core'
import {
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
} from '@material-ui/core'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import router from 'next/router'

export interface Data extends TableRowData {
  title: JSX.Element
  meeting_date: string
  place_id: string
  summary: string
  created_at: string
  recorded_by: string
  id: number
}

export type Inputs = {
  count: string // 6,10 -> min: 6 max: 10
  meeting_date: string
  keyword: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: 0,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    link: {
      color: theme.palette.primary.main,
    },
  })
)

const Index = () => {
  const classes = useStyles()

  const headCells: HeadCell<Data>[] = [
    {
      id: 'title',
      numeric: false,
      disablePadding: true,
      label: '会議名',
      align: 'left',
      size: 180,
    },
    {
      id: 'meeting_date',
      numeric: false,
      disablePadding: false,
      label: '開催日時',
      size: 150,
      align: 'center',
    },
    {
      id: 'place_id',
      numeric: false,
      disablePadding: false,
      label: '開催場所',
      size: 150,
      align: 'center',
    },
    {
      id: 'summary',
      numeric: false,
      disablePadding: false,
      label: '概要',
      align: 'left',
      size: 180,
      long: true,
    },
    {
      id: 'created_at',
      numeric: false,
      disablePadding: false,
      label: '記録日',
      align: 'center',
      size: 120,
    },
    {
      id: 'recorded_by',
      numeric: false,
      disablePadding: false,
      label: '記録者',
      align: 'center',
      size: 150,
    },
    {
      id: 'id',
      numeric: false,
      disablePadding: false,
      label: '操作',
      align: 'center',
    },
  ]
  const [meetingRecords, setMeetingRecords] = useState<
    Pager<MeetingRecord> | any
  >([])
  const [rows, setRows] = useState<Data[]>([])
  const [latestUri, setLatestUri] = useState<string>(
    requests.meetingRecord.list
  )

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      count: '2,5',
      meeting_date: '2021/07',
      keyword: '',
    },
  })
  const handleSearch = async (data: Inputs) => {
    console.log(data)
  }

  useEffect(() => {
    const init = async () => {
      await httpClient.get(requests.meetingRecord.list).then((res) => {
        setMeetingRecords(res.data)
        setRows(createRows(res.data.data))
      })
    }
    init()
  }, [])

  const handleAdd = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push('/mypage/meeting_record/create')
  }

  const handlePage = async (
    event:
      | React.MouseEvent<unknown>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | null,
    args: QueryParam<Data>
  ) => {
    if (args.hasOwnProperty('sort_key')) {
      let uri = meetingRecords.path.replace(
        String(process.env.NEXT_PUBLIC_API_URL),
        ''
      )
      uri += `?page=${args.page}&sort_key=${args.sort_key}&order_by=${args.order_by}`
      await httpClient.get(uri).then((res) => {
        setMeetingRecords(res.data)
        setLatestUri(uri)
        setRows(createRows(res.data.data))
      })
    }
  }

  const handleDeleteClick = async (ids: number[]) => {
    const queryParams = latestUri.match(/\?.+$/)
    await httpClient
      .delete(`${requests.meetingRecord.delete}/${ids[0]}${queryParams || ''}`)
      .then((res) => {
        setMeetingRecords(res.data)
        setRows(createRows(res.data.data))
        // setAlertStatus((prev) => ({
        //   ...prev,
        //   msg: '削除しました',
        //   severity: 'error',
        //   show: true,
        // }))
      })
  }

  const handleEditClick = (id: number) => {
    router.push(`/mypage/meeting_record/update/${id}`)
  }

  const createRows = (list: MeetingRecord[]): Data[] =>
    list.map((meetingRecord: MeetingRecord) => ({
      title: (
        <Link href={`/mypage/meeting_record/${meetingRecord.id}`} passHref>
          <Tooltip title={'詳細画面へ'}>
            <a className={classes.link}>{meetingRecord.title}</a>
          </Tooltip>
        </Link>
      ),
      meeting_date: toStrLabel(new Date(meetingRecord.meeting_date)),
      place_id: meetingRecord.place.name,
      summary: meetingRecord.summary,
      created_at: toStrLabel(new Date(meetingRecord.created_at)),
      recorded_by: meetingRecord.recorded_by.full_name,
      id: meetingRecord.id,
    }))

  return (
    <MypageLayout title="議事録">
      <div className="container">
        <MypageTitle>議事録</MypageTitle>
      </div>
      <section className="container">
        <form noValidate onSubmit={handleSubmit(handleSearch)}>
          <CommonTable
            headCells={headCells}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
            onPage={handlePage}
            pagerData={meetingRecords}
            rows={rows}
            title="会議議事録一覧"
            // multiSelect
          >
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
              <Grid item xs={12} md={6}>
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
                  rules={{ required: true }}
                />
              </Grid>
            </Grid>
          </CommonTable>
        </form>
        <AddButton onClick={handleAdd} title="議事録を追加する" />
      </section>
    </MypageLayout>
  )
}

export default Index
