import React from 'react'
import { ChatMessage } from '@/interfaces/models'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  ChatIcon,
  MeetingRecordIcon,
  TaskIcon,
  ScheduleIcon,
} from '@/components/atoms/icons'
import { AlertStatus } from '@/interfaces/common'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topIcon: {
      color: theme.palette.primary.main,
      fontSize: '3.5rem',
    },
  })
)

export const deletedMessage = (originalMessage: ChatMessage) => ({
  ...originalMessage,
  body: 'このメッセージは削除されました',
  images: [],
  reactions: [],
  chat_message_reads: [],
  isDelete: true,
})

export type Product = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

export const ProductList = (): Product[] => {
  const classes = useStyles()
  return [
    {
      id: 'meeting_record',
      title: '議事録作成機能',
      description: '会議の概要や決議事項を記録して、あとから見返せます。',
      icon: <MeetingRecordIcon className={classes.topIcon} />,
    },
    {
      id: 'schedule',
      title: 'スケジュール機能',
      description: 'スケジュールの登録ほか、他のユーザとの共有も可能です。',
      icon: <ScheduleIcon className={classes.topIcon} />,
    },
    {
      id: 'task',
      title: 'タスク機能',
      description:
        '期日や優先度を設定できるほか、状態更新による進捗把握も可能です。',
      icon: <TaskIcon className={classes.topIcon} />,
    },
    {
      id: 'chat',
      title: 'チャット機能',
      description:
        'ブラウザがメッセージの投稿をリアルタイムに検知し、メッセージの新着をお知らせします。',
      icon: <ChatIcon className={classes.topIcon} />,
    },
  ]
}

export const initialAlertStatus: AlertStatus = {
  severity: 'error',
  variant: 'filled',
  msg: '',
  show: false,
}
