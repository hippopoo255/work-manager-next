import React, { useState, useMemo } from 'react'
import { MenuToggler, NavItem } from '@/components/atoms/top'
import { useInitialAuthentication, useLocale } from '@/hooks'
import router from 'next/router'
import pGlobalNav from '@/assets/scss/Module/global-nav.module.scss'
import clsx from 'clsx'
import Features from '@/lib/features'
import { LoginIcon, SignupIcon } from '@/components/atoms/icons'
import { FeatureItem } from '@/lib/features'

const GlobalNav = () => {
  const { t } = useLocale()

  const [open, setOpen] = useState(false)
  const { auth } = useInitialAuthentication(true)
  const features = Features()
  const guestHeader = [
    {
      id: 'login',
      to: '/login',
      name: t.head.title.login,
      text: t.head.title.login,
      handleClick: (item: FeatureItem) => {
        router.push(item.to)
      },
      icon: <LoginIcon fontSize={'28px'} />,
    },
    {
      id: 'signup',
      to: '/signup',
      name: t.head.title.signup,
      text: t.head.title.signup,
      handleClick: (item: FeatureItem) => {
        router.push(item.to)
      },
      icon: <SignupIcon fontSize={'28px'} />,
    },
  ]
  const authHeader = [
    {
      id: 'mypage',
      to: '/mypage',
      name: t.authMenu.mypage,
      text: t.authMenu.mypage,
      handleClick: (item: FeatureItem) => {
        router.push(item.to)
      },
      icon: <LoginIcon fontSize={'28px'} />,
    },
    // {
    //   id: 'signup',
    //   to: '/signup',
    //   name: t.head.title.signup,
    //   text: t.head.title.signup,
    //   handleClick: (item: FeatureItem) => {
    //     router.push(item.to)
    //   },
    //   icon: <SignupIcon fontSize={'28px'} />,
    // },
  ]

  const headerLinks = useMemo(
    () => (auth.isLogin ? authHeader : guestHeader),
    [auth]
  )

  const navMenus = useMemo(() => [...features, ...headerLinks], [auth])

  return (
    <nav className={pGlobalNav.root}>
      <MenuToggler open={open} setOpen={setOpen} />
      <ul
        className={clsx(pGlobalNav.list, {
          [pGlobalNav.open]: open,
        })}
      >
        {navMenus.length &&
          navMenus.map((feature) => (
            <li key={feature.to} className={pGlobalNav.item}>
              <NavItem item={feature} setOpen={setOpen} />
            </li>
          ))}
      </ul>
    </nav>
  )
}

export default GlobalNav
