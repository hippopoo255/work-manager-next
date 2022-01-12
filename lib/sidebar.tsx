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
import { useLocale } from '@/hooks'

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

const SidebarMenus = () => {
  const { t, locale } = useLocale()
  return {
    home: [
      {
        id: 'home',
        icon: <HomeIcon />,
        to: '/',
        text: t.sidebar.home,
      },
    ],
    top: [
      {
        id: 'meeting',
        icon: <MeetingRecordIcon />,
        text: t.sidebar.meeting.parent,
        open: false,
        to: '/mypage/meeting_record',
        children: [
          {
            id: 'meeting_index',
            to: '/mypage/meeting_record',
            icon: <ListIcon />,
            text: t.sidebar.meeting.children.index,
          },
          {
            id: 'meeting_create',
            to: '/mypage/meeting_record/create',
            icon: <AddIcon />,
            text: t.sidebar.meeting.children.create,
          },
        ],
      },
      {
        id: 'schedule',
        icon: <ScheduleIcon />,
        to: '/mypage/schedule',
        text: t.sidebar.schedule.parent,
      },
      {
        id: 'document',
        icon: <DocumentIcon />,
        to: '/mypage/document',
        text: t.sidebar.document.parent,
        disabled: true,
      },
      {
        id: 'task',
        icon: <TaskIcon />,
        to: '/mypage/task',
        text: t.sidebar.task.parent,
      },
      {
        id: 'chat',
        icon: <ChatIcon />,
        to: '/mypage/chat',
        text: t.sidebar.chat.parent,
      },
      {
        id: 'blog',
        icon: <BlogIcon />,
        to: '/mypage/blog',
        text: t.sidebar.blog.parent,
        disabled: true,
      },
    ],
    bottom: [
      {
        id: 'settings',
        text: t.sidebar.setting.parent,
        icon: <SettingIcon />,
        to: '/mypage/setting',
      },
    ],
  }
}

export default SidebarMenus
