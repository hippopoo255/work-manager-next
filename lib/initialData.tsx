import React from 'react'
import { ChatMessage } from '@/interfaces/models'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {
  ChatIcon,
  MeetingRecordIcon,
  TaskIcon,
  ScheduleIcon,
} from '@/components/atoms/icons'
import { AlertStatus, Product } from '@/interfaces/common'
import {
  BlogStatus,
  CreateBlogInput,
  UpdateBlogInput,
} from '@/interfaces/graphql/generated/graphql'

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

export const ProductList = (): Product[] => {
  const classes = useStyles()
  return [
    {
      id: 'meeting_record',
      title: '議事録作成機能',
      description:
        '会議ごとに「議題」「参加者」「決定事項」などを記録し、あとから検索して読み返すことができます。',
      icon: <MeetingRecordIcon className={classes.topIcon} />,
    },
    {
      id: 'schedule',
      title: 'スケジュール機能',
      description: '登録した予定は、他のユーザとの共有も可能です。',
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
        'ページの再読込をしなくても、新着メッセージや未読件数を最新の状態で表示します。',
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

export const createBlogInput: CreateBlogInput = {
  title: '',
  body: '',
  status: BlogStatus.Pending,
  createdBy: {
    id: '',
    name: '',
  },
  tags: [],
}
