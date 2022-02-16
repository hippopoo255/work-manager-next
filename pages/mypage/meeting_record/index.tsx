import React, { useState, useEffect } from 'react'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import {
  CommonTable,
  SearchBox,
  SearchMeetingRecordForm,
} from '@/components/organisms'
import { useRouter } from 'next/router'
import { AddButton } from '@/components/molecules'
import { Pager } from '@/interfaces/common'
import { SortParam } from '@/interfaces/table'
import { MeetingRecord } from '@/interfaces/models'
import { MeetingTableRowData } from '@/interfaces/table/rowData'
import { SearchMeetingRecordInputs } from '@/interfaces/form/inputs'
import { requestUri } from '@/api'
import { getSortParams, handlePageUri } from '@/lib/util'
import { headCells, createRows } from '@/lib/table/meetingRecord'
import { BookmarkButton } from '@/components/atoms'
import { useAuth, useRestApi } from '@/hooks'

const Index = () => {
  const router = useRouter()
  const [meetingRecords, setMeetingRecords] =
    useState<Pager<MeetingRecord> | null>(null)
  const [rows, setRows] = useState<MeetingTableRowData[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [latestUri, setLatestUri] = useState<string>(
    requestUri.meetingRecord.list
  )
  const { getMethod, deleteMethod } = useRestApi()
  const { auth, config } = useAuth()
  const slicedSortKeys = () => {
    const isSorting = latestUri.match(/[?&]sort_key=.+&order_by=.+/g)
    return !isSorting ? '' : isSorting[0].replace(/^[?]sort_key/, '&sort_key')
  }
  const handleSearch = async (data: SearchMeetingRecordInputs) => {
    setLoading(true)
    let path = requestUri.meetingRecord.list + getSortParams(data)
    path += slicedSortKeys()
    setLatestUri(path)
    return await getMethod<Pager<MeetingRecord, SearchMeetingRecordInputs>>(
      path
    ).finally(() => {
      setLoading(false)
    })
  }

  const handleSuccess = (
    res: Pager<MeetingRecord, SearchMeetingRecordInputs>
  ) => {
    setMeetingRecords(res)
    setRows(createRows(res.data, afterBookmark))
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
      setLoading(true)
      const uri = handlePageUri(latestUri, args)
      await getMethod<Pager<MeetingRecord, SearchMeetingRecordInputs>>(uri)
        .then((res) => {
          setMeetingRecords(res)
          setLatestUri(uri)
          setRows(createRows(res.data, afterBookmark))
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const afterBookmark = (bookmarkedRecord: MeetingRecord) => {
    setMeetingRecords((prev) => {
      if (prev !== null) {
        const newData = [...prev.data]
        const index = prev.data.findIndex(
          (meetingRecord) => meetingRecord.id === bookmarkedRecord.id
        )
        if (index !== -1) {
          newData[index].is_pin = bookmarkedRecord.is_pin
        }
        return {
          ...prev,
          data: [...newData],
        }
      }
      return prev
    })
    setRows((prev) => {
      if (prev !== null) {
        const newRows = [...prev]
        const index = newRows.findIndex((row) => row.id === bookmarkedRecord.id)
        if (index !== -1) {
          newRows[index].is_pin = (
            <BookmarkButton
              is_pin={!!bookmarkedRecord.is_pin}
              id={bookmarkedRecord.id}
              onSuccess={afterBookmark}
            />
          )
        }
        return [...newRows]
      }
      return prev
    })
  }

  const handleDeleteClick = async (ids: (number | string)[]) => {
    const queryParams = latestUri.match(/\?.+$/)
    await deleteMethod<Pager<MeetingRecord, SearchMeetingRecordInputs>>(
      `${requestUri.meetingRecord.delete}/${ids[0]}${queryParams || ''}`
    ).then((res) => {
      setMeetingRecords(res)
      setRows(createRows(res.data, afterBookmark))
    })
  }

  const handleEditClick = (id?: number | string) => {
    router.push(`/mypage/meeting_record/update/${id}`)
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      let initialQuery = ''
      if (!!Object.keys(router.query).length) {
        initialQuery =
          '?' +
          Object.keys(router.query)
            .map((key) => `${key}=${router.query[key]}`)
            .join('&')
      }
      if (auth.isLogin && auth.user.is_initialized) {
        await getMethod<Pager<MeetingRecord>>(
          requestUri.meetingRecord.list + initialQuery
        )
          .then((res) => {
            setMeetingRecords(res)
            setRows(createRows(res.data, afterBookmark))
          })
          .finally(() => {
            setLoading(false)
          })
      }
    }
    init()
  }, [router, auth])

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
          fetching={loading}
          // multiSelect
        >
          <SearchBox
            position={{
              position: 'absolute',
              top: 12,
              right: 16,
            }}
            formContent={
              <SearchMeetingRecordForm
                currentTotalCount={
                  meetingRecords !== null ? meetingRecords.total : 0
                }
                onSuccess={handleSuccess}
                req={handleSearch}
                initialParams={
                  meetingRecords !== null && !!meetingRecords.query_params
                    ? meetingRecords.query_params
                    : {}
                }
                yearMonth={
                  meetingRecords !== null &&
                  meetingRecords.year_month !== undefined
                    ? meetingRecords.year_month
                    : null
                }
              />
            }
          />
        </CommonTable>
        <AddButton onClick={handleAdd} title="議事録を追加する" />
      </section>
    </MypageLayout>
  )
}

export default Index
