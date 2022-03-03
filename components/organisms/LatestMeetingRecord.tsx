import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { MeetingRecord } from '@/interfaces/models'
import { DashboardBaseCard } from '@/components/organisms'
import { Header, FooterLink } from '@/interfaces/common/dashboard'
import { MeetingRecordIcon } from '@/components/atoms/icons'
import { requestUri } from '@/api'
import { headCells, createRows } from '@/lib/table/meetingRecord'
import { useLocale, useInitialConnector } from '@/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
  },
  td: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    display: 'inline-block',
    overflow: 'hidden',
    width: '100%',
  },
}))

type Props = {
  wrapClasses: any
}

// eslint-disable-next-line react/display-name
const LatestMeetingRecord = React.memo(({ wrapClasses }: Props) => {
  const classes = useStyles()
  const [meetingRecords, setMeetingRecords] = useState<MeetingRecord[]>([])
  const { t } = useLocale()
  const { loading } = useInitialConnector<MeetingRecord[]>({
    path: requestUri.meetingRecord.myRecently,
    onSuccess: (records) => {
      setMeetingRecords(records)
    },
  })
  const header: Header = {
    avatar: <MeetingRecordIcon />,
    title: t.mypage.minutes,
    subTitle: '',
  }
  const footerLink: FooterLink = {
    to: '/mypage/meeting_record?only_me=1',
    color: 'primary',
    text: t.common.more,
  }

  const afterBookmark = (bookmarkedRecord: MeetingRecord) => {
    setMeetingRecords((prev: MeetingRecord[]) => {
      const index = prev.findIndex(
        (meetingRecord) => meetingRecord.id === bookmarkedRecord.id
      )
      if (index !== -1) {
        prev[index].is_pin = bookmarkedRecord.is_pin
      }
      return [...prev]
    })
  }

  return (
    <DashboardBaseCard
      header={header}
      footerLink={footerLink}
      wrapClasses={wrapClasses}
      scroll
      loading={loading}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {!!headCells.length &&
              headCells.map(
                (cell) =>
                  cell.id !== 'id' && (
                    <TableCell
                      align={cell.align}
                      key={cell.id}
                      style={{ minWidth: cell.size || 100 }}
                    >
                      {cell.label}
                    </TableCell>
                  )
              )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!meetingRecords.length ? (
            createRows(meetingRecords, afterBookmark).map((row) => (
              <TableRow key={row.id}>
                {!!headCells.length &&
                  headCells.map(
                    (cell) =>
                      cell.id !== 'id' && (
                        <TableCell
                          key={`d_${cell.id}`}
                          align={cell.align}
                          style={{
                            minWidth: cell.size || 100,
                            maxWidth: cell.long ? cell.size : 'initial',
                          }}
                        >
                          <span
                            className={clsx({
                              [classes.td]: cell.long,
                            })}
                          >
                            {row[cell.id]}
                          </span>
                        </TableCell>
                      )
                  )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                style={{ height: 53, borderBottomColor: 'transparent' }}
                colSpan={headCells.length + 1}
              >
                参加者として登録された議事録はありません。
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </DashboardBaseCard>
  )
})

export default LatestMeetingRecord
