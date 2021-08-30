import React from 'react'
import {
  AddIcon,
  BlogIcon,
  ChatIcon,
  DocumentIcon,
  ListIcon,
  MeetingRecordIcon,
  ScheduleIcon,
  SettingIcon,
  TaskIcon,
} from '@/components/atoms/icons'
import HomeIcon from '@material-ui/icons/Home'

export type Child = {
  id: string
  icon: any
  text: string
  to: string
  is_notify?: boolean
}
export type Menu = {
  id: string
  icon: any
  text: string
  to: string
  children?: Child[]
  open?: boolean
  disabled?: boolean
  is_notify?: boolean
}

export type Menus = {
  [k: string]: Menu[]
}

export const sidebarMenus = {
  home: [
    {
      id: 'home',
      icon: <HomeIcon />,
      to: '/',
      text: 'Home',
    },
  ],
  top: [
    {
      id: 'meeting',
      icon: <MeetingRecordIcon />,
      text: '会議',
      open: false,
      to: '/mypage/meeting_record',
      children: [
        {
          id: 'meeting_index',
          to: '/mypage/meeting_record',
          icon: <ListIcon />,
          text: '議事録一覧',
        },
        {
          id: 'meeting_create',
          to: '/mypage/meeting_record/create',
          icon: <AddIcon />,
          text: '議事録追加',
        },
      ],
    },
    {
      id: 'schedule',
      icon: <ScheduleIcon />,
      to: '/mypage/schedule',
      text: 'スケジュール',
    },
    {
      id: 'document',
      icon: <DocumentIcon />,
      to: '/mypage/document',
      text: 'ドキュメント',
      disabled: true,
    },
    {
      id: 'task',
      icon: <TaskIcon />,
      to: '/mypage/task',
      text: 'タスク',
    },
    {
      id: 'chat',
      icon: <ChatIcon />,
      to: '/mypage/chat',
      text: 'チャット',
    },
    {
      id: 'blog',
      icon: <BlogIcon />,
      to: '/mypage/blog',
      text: 'ブログ',
      disabled: true,
    },
  ],
  bottom: [
    {
      id: 'settings',
      text: '設定',
      icon: <SettingIcon />,
      to: '/mypage/setting',
    },
  ],
}
