import React from 'react'
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined'
import BookOutlinedIcon from '@material-ui/icons/BookOutlined'
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined'
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined'
import LibraryAddOutlinedIcon from '@material-ui/icons/LibraryAddOutlined'
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import TocOutlinedIcon from '@material-ui/icons/TocOutlined'

export type Child = {
  id: string
  to: string
  icon: any
  text: string
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
  top: [
    {
      id: 'meeting',
      icon: <MenuBookOutlinedIcon />,
      to: '/mypage/meeting_record',
      text: '会議',
      open: false,
      children: [
        {
          id: 'meeting_index',
          to: '/mypage/meeting_record',
          icon: <TocOutlinedIcon />,
          text: '議事録一覧',
        },
        {
          id: 'meeting_create',
          to: '/mypage/meeting_record/create',
          icon: <LibraryAddOutlinedIcon />,
          text: '議事録追加',
        },
      ],
    },
    {
      id: 'schedule',
      icon: <EventAvailableOutlinedIcon />,
      to: '/mypage/schedule',
      text: 'スケジュール',
    },
    {
      id: 'document',
      icon: <FolderOpenOutlinedIcon />,
      to: '/mypage/document',
      text: 'ドキュメント',
      disabled: true,
    },
    {
      id: 'task',
      icon: <AttachFileOutlinedIcon />,
      to: '/mypage/task',
      text: 'タスク',
    },
    {
      id: 'chat',
      icon: <SendOutlinedIcon />,
      to: '/mypage/chat',
      text: 'チャット',
    },
    {
      id: 'blog',
      icon: <BookOutlinedIcon />,
      to: '/mypage/blog',
      text: 'ブログ',
      disabled: true,
    },
  ],
  bottom: [
    {
      id: 'settings',
      text: '設定',
      icon: <SettingsOutlinedIcon />,
      to: '/mypage/setting',
    },
  ],
}
