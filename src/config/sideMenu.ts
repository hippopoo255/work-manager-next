import { TFunction } from 'next-i18next'
import { IconType } from 'react-icons'
import { BiListUl, BiAddToQueue } from 'react-icons/bi'
import { BsChatDots, BsCalendar4Week } from 'react-icons/bs'
import { MdOutlineTask } from 'react-icons/md'
import { SiGotomeeting } from 'react-icons/si'

export type SideMenu = Array<{
  label: string
  icon: IconType
  path?: string
  children?: SideMenu
}>

export const sideMenu: (t: TFunction) => SideMenu = (t: TFunction) => [
  // 議事録
  {
    label: t('sideMenu.minutes.index'),
    icon: SiGotomeeting,
    children: [
      {
        label: t('sideMenu.minutes.list'),
        icon: BiListUl,
        path: '/mypage/minutes',
      },
      {
        label: t('sideMenu.minutes.create'),
        icon: BiAddToQueue,
        path: '/mypage/create',
      },
    ],
  },
  // タスク
  {
    label: t('sideMenu.task.index'),
    icon: MdOutlineTask,
    children: [
      {
        label: t('sideMenu.task.list'),
        icon: BiListUl,
        path: '/mypage/task',
      },
      {
        label: t('sideMenu.task.create'),
        icon: BiAddToQueue,
        path: '/mypage/task/create',
      },
    ],
  },
  // スケジュール
  {
    label: t('sideMenu.schedule.index'),
    icon: BsCalendar4Week,
    path: '/mypage/schedule',
  },
  // チャット
  {
    label: t('sideMenu.chat.index'),
    icon: BsChatDots,
    path: '/mypage/chat',
  },
]
