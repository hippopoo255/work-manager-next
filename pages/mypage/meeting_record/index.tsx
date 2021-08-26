import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { CommonTable } from '@/components/organisms'
import { AddButton } from '@/components/molecules'
import { Pager } from '@/interfaces'
import { HeadCell, QueryParam } from '@/interfaces/table'
import { MeetingRecord } from '@/interfaces/models'
import { toStrLabel } from '@/lib/util'
import { Tooltip } from '@material-ui/core'
import Link from 'next/link'
import router from 'next/router'
import { MeetingTableRowData } from '@/interfaces/table/rowData'
import { API_URL } from '@/lib/util'
import { SearchMeetingRecordForm } from '@/components/organisms'
import { SearchMeetingRecordInputs } from '@/interfaces/form/inputs'
import { getRequest, deleteRequest, requestUri } from '@/api'
import { getQueryParams, handlePageUri } from '@/lib/util'

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
    SearchIcon: {
      background: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  })
)

const Index = () => {
  const classes = useStyles()

  const headCells: HeadCell<MeetingTableRowData>[] = [
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
  const [meetingRecords, setMeetingRecords] =
    useState<Pager<MeetingRecord> | null>(null)
  const [rows, setRows] = useState<MeetingTableRowData[]>([])
  const [latestUri, setLatestUri] = useState<string>(
    requestUri.meetingRecord.list
  )
  const handleSearch = async (data: SearchMeetingRecordInputs) => {
    const path = requestUri.meetingRecord.list + getQueryParams(data)
    setLatestUri(path)
    return await getRequest<Pager<MeetingRecord>>(path, (err) => {
      if (err.status === 401) {
        router.push('/login')
      }
      if (err.status === 403) {
        router.push('/403', '/forbidden')
      }
      if (err.status === 404) {
        router.push('/404', '/notfound')
      }
      throw err
    })
  }

  const handleSuccess = (res: Pager<MeetingRecord>) => {
    setMeetingRecords(res)
    setRows(createRows(res.data))
  }

  const handleAdd = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    router.push('/mypage/meeting_record/create')
  }

  const handlePage = async (
    event:
      | React.MouseEvent<unknown>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | null,
    args: QueryParam<MeetingTableRowData>
  ) => {
    if (args.hasOwnProperty('sort_key') && meetingRecords !== null) {
      const uri = handlePageUri(latestUri, meetingRecords.path, args)
      await getRequest<Pager<MeetingRecord>>(uri).then((res) => {
        setMeetingRecords(res)
        setLatestUri(uri)
        setRows(createRows(res.data))
      })
    }
  }

  const handleDeleteClick = async (ids: number[]) => {
    const queryParams = latestUri.match(/\?.+$/)
    await deleteRequest<Pager<MeetingRecord>>(
      `${requestUri.meetingRecord.delete}/${ids[0]}${queryParams || ''}`
    )
      .then((res) => {
        setMeetingRecords(res)
        setRows(createRows(res.data))
        // setAlertStatus((prev) => ({
        //   ...prev,
        //   msg: '削除しました',
        //   severity: 'error',
        //   show: true,
        // }))
      })
      .catch((err) => {
        console.error(err.response)
        if (err.response.status === 401) {
          router.push('/login')
        }
        if (err.response.status === 403) {
          router.push('/403', '/forbidden')
        }
      })
  }

  const handleEditClick = (id: number) => {
    router.push(`/mypage/meeting_record/update/${id}`)
  }

  const createRows = (list: MeetingRecord[]): MeetingTableRowData[] =>
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
      is_editable: meetingRecord.is_editable,
    }))

  useEffect(() => {
    const init = async () => {
      await getRequest<Pager<MeetingRecord>>(
        requestUri.meetingRecord.list
      ).then((res) => {
        setMeetingRecords(res)
        setRows(createRows(res.data))
      })
    }
    init()
  }, [])

  return (
    <MypageLayout title="議事録">
      <div className="container">
        <MypageTitle>議事録</MypageTitle>
      </div>
      <section className="container">
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
          <SearchMeetingRecordForm
            onSuccess={handleSuccess}
            req={handleSearch}
            classes={classes}
          />
        </CommonTable>
        <AddButton onClick={handleAdd} title="議事録を追加する" />
      </section>
    </MypageLayout>
  )
}

export default Index
