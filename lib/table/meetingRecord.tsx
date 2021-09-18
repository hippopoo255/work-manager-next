import { HeadCell } from '@/interfaces/table'
import { MeetingTableRowData } from '@/interfaces/table/rowData'
import { MeetingRecord } from '@/interfaces/models'
import { Tooltip } from '@material-ui/core'
import Link from 'next/link'
import { toStrLabel } from '@/lib/util'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { BookmarkButton } from '@/components/atoms'
import { requestUri, postRequest } from '@/api'
import { Task } from '@/interfaces/models'

export const headCells: HeadCell<MeetingTableRowData>[] = [
  {
    id: 'is_pin',
    numeric: false,
    disablePadding: false,
    label: '',
    align: 'center',
    size: 10,
  },
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: '会議名',
    align: 'left',
    size: 180,
  },
  {
    id: 'meeting_date',
    numeric: false,
    disablePadding: false,
    label: '開催日時',
    size: 160,
    align: 'right',
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
    size: 170,
    long: true,
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: '記録日',
    align: 'center',
    size: 140,
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

export const createRows = (
  list: MeetingRecord[],
  onSuccess?: any
): MeetingTableRowData[] => {
  return list.map((meetingRecord: MeetingRecord) => {
    return {
      is_pin: (
        <BookmarkButton
          is_pin={!!meetingRecord.is_pin}
          id={meetingRecord.id}
          onSuccess={onSuccess}
        />
      ),
      title: (
        <Link href={`/mypage/meeting_record/${meetingRecord.id}`} passHref>
          <Tooltip title={'詳細画面へ'}>
            <a style={{ color: '#43a047' }}>{meetingRecord.title}</a>
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
    }
  })
}
