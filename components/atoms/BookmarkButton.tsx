import React from 'react'
import clsx from 'clsx'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import { IconButton, Tooltip } from '@material-ui/core'
import { MeetingRecord } from '@/interfaces/models'
import { requestUri } from '@/api'
import { useAuth, useRestApi } from '@/hooks'
const useStyles = makeStyles((theme: Theme) => ({
  common: {
    fontSize: theme.typography.h6.fontSize,
  },
  active: {
    color: theme.palette.warning.main,
  },
  invalid: {
    color: theme.palette.text.secondary,
  },
}))

type Props = {
  is_pin?: boolean
  id?: number
  onSuccess?: (response: MeetingRecord) => void
}
const BookmarkButton = ({ is_pin, id, onSuccess }: Props) => {
  const classes = useStyles()
  const { config } = useAuth()
  const { postMethod, putMethod } = useRestApi()
  const operationValue = () => {
    if (onSuccess === undefined) {
      return is_pin ? 'ブックマークしています' : ''
    }
    return is_pin ? 'ブックマーク解除' : 'ブックマーク'
  }

  const handleBookmark = async () => {
    if (is_pin === undefined || onSuccess === undefined) {
      return false
    }
    if (is_pin === false) {
      await bookmark()
    } else {
      await unbookmark()
    }
  }

  const bookmark = async () =>
    await postMethod<MeetingRecord, {}>(
      requestUri.meetingRecord.bookmark.replace(':id', String(id)),
      {}
    ).then((res) => {
      if (!!onSuccess) {
        onSuccess(res)
      }
    })

  const unbookmark = async () => {
    await putMethod<MeetingRecord, {}>(
      requestUri.meetingRecord.unbookmark.replace(':id', String(id)),
      {}
    ).then((res) => {
      if (!!onSuccess) {
        onSuccess(res)
      }
    })
  }

  return (
    <Tooltip title={operationValue()}>
      <IconButton
        size={'small'}
        onClick={handleBookmark}
        disabled={onSuccess === undefined}
      >
        {is_pin ? (
          <BookmarkIcon className={clsx([classes.common, classes.active])} />
        ) : (
          <BookmarkBorderIcon
            className={clsx([classes.common, classes.invalid])}
          />
        )}
      </IconButton>
    </Tooltip>
  )
}

export default BookmarkButton
