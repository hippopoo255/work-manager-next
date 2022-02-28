import React, { useState } from 'react'
import { NavItem } from '@/components/molecules/top'
import { MenuToggler } from '@/components/atoms/top'
import { useLocale } from '@/hooks'
import pGlobalNav from '@/assets/scss/Object/Project/p-global-nav.module.scss'
import clsx from 'clsx'
import Features from '@/lib/features'

const GlobalNav = () => {
  const { t } = useLocale()

  // const features = [
  //   {
  //     to: '#meeting_record',
  //     text: t.application.meetingRecord,
  //   },
  //   {
  //     to: '#schedule',
  //     text: t.application.schedule,
  //   },
  //   {
  //     to: '#task',
  //     text: t.application.task,
  //   },
  //   {
  //     to: '#chat',
  //     text: t.application.chat,
  //   },
  //   {
  //     to: '#about_notification',
  //     text: t.application.notification,
  //   },
  //   {
  //     to: '#about_realtime',
  //     text: t.application.realtime,
  //   },
  // ]

  const [open, setOpen] = useState(false)
  const features = Features()
  return (
    <nav className={pGlobalNav.root}>
      <MenuToggler open={open} setOpen={setOpen} />
      <ul
        className={clsx(pGlobalNav.list, {
          [pGlobalNav.open]: open,
        })}
      >
        {features.length &&
          features.map((feature) => (
            <li key={feature.to} className={pGlobalNav.item}>
              <NavItem item={feature} setOpen={setOpen} />
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default GlobalNav
