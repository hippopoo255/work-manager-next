import { TFunction } from 'next-i18next'
import { IconType } from 'react-icons'
import { BiListUl, BiAddToQueue } from 'react-icons/bi'
import { icons } from './icon'

export type SideMenu = Array<{
  label: string
  icon: IconType
  path?: string
  children?: SideMenu
}>

export type TKey = 'primary' | 'secondary'

export const sideMenus: (t: TFunction) => { [k in TKey]: SideMenu } = (
  t: TFunction
) => ({
  primary: [
    // 議事録
    {
      label: t('sideMenu.minutes.index'),
      icon: icons.minutes,
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
      icon: icons.task,
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
      icon: icons.schedule,
      path: '/mypage/schedule',
    },
    // チャット
    {
      label: t('sideMenu.chat.index'),
      icon: icons.chat,
      path: '/mypage/chat',
    },
  ],
  secondary: [
    {
      label: t('sideMenu.setting.index'),
      icon: icons.setting,
      path: '/mypage/setting',
    },
  ],
})
