import React, { useState, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { CommonTable } from '@/components/organisms'
import { AddButton } from '@/components/molecules'
import { Pager } from '@/interfaces/common'
import { SortParam } from '@/interfaces/table'
import { MeetingRecord } from '@/interfaces/models'
import { useRouter } from 'next/router'
import { MeetingTableRowData } from '@/interfaces/table/rowData'
import { SearchMeetingRecordForm } from '@/components/organisms'
import { SearchMeetingRecordInputs } from '@/interfaces/form/inputs'
import { getRequest, deleteRequest, requestUri } from '@/api'
import { getSortParams, handlePageUri } from '@/lib/util'
import { headCells, createRows } from '@/lib/table/meetingRecord'

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
  const router = useRouter()
  const [meetingRecords, setMeetingRecords] =
    useState<Pager<MeetingRecord> | null>(null)
  const [rows, setRows] = useState<MeetingTableRowData[]>([])
  const [latestUri, setLatestUri] = useState<string>(
    requestUri.meetingRecord.list
  )
  const slicedSortKeys = () => {
    const isSorting = latestUri.match(/[?&]sort_key=.+&order_by=.+/g)
    return !isSorting ? '' : isSorting[0].replace(/^[?]sort_key/, '&sort_key')
  }
  const handleSearch = async (data: SearchMeetingRecordInputs) => {
    let path = requestUri.meetingRecord.list + getSortParams(data)
    path += slicedSortKeys()
    console.log(path)
    setLatestUri(path)
    return await getRequest<Pager<MeetingRecord, SearchMeetingRecordInputs>>(
      path
    )
  }

  const handleSuccess = (
    res: Pager<MeetingRecord, SearchMeetingRecordInputs>
  ) => {
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
    args: SortParam<MeetingTableRowData>
  ) => {
    if (args.hasOwnProperty('sort_key') && meetingRecords !== null) {
      const uri = handlePageUri(latestUri, args)
      console.log('uri:', uri)
      await getRequest<Pager<MeetingRecord, SearchMeetingRecordInputs>>(
        uri
      ).then((res) => {
        setMeetingRecords(res)
        setLatestUri(uri)
        setRows(createRows(res.data))
      })
    }
  }

  const handleDeleteClick = async (ids: number[]) => {
    const queryParams = latestUri.match(/\?.+$/)
    await deleteRequest<Pager<MeetingRecord, SearchMeetingRecordInputs>>(
      `${requestUri.meetingRecord.delete}/${ids[0]}${queryParams || ''}`
    ).then((res) => {
      setMeetingRecords(res)
      setRows(createRows(res.data))
    })
  }

  const handleEditClick = (id: number) => {
    router.push(`/mypage/meeting_record/update/${id}`)
  }

  useEffect(() => {
    const init = async () => {
      let initialQuery = ''
      if (!!Object.keys(router.query).length) {
        initialQuery =
          '?' +
          Object.keys(router.query)
            .map((key) => `${key}=${router.query[key]}`)
            .join('&')
      }
      await getRequest<Pager<MeetingRecord>>(
        requestUri.meetingRecord.list + initialQuery
      ).then((res) => {
        setMeetingRecords(res)
        setRows(createRows(res.data))
      })
    }
    init()
  }, [router])

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
            initialParams={
              meetingRecords !== null && !!meetingRecords.query_params
                ? meetingRecords.query_params
                : {}
            }
            yearMonth={
              meetingRecords !== null && meetingRecords.year_month !== undefined
                ? meetingRecords.year_month
                : null
            }
          />
        </CommonTable>
        <AddButton onClick={handleAdd} title="議事録を追加する" />
      </section>
    </MypageLayout>
  )
}

export default Index
