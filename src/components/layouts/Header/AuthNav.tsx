import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import AuthAvatar from './AuthAvatar'
import { useAuthContext } from '~/services/auth'

export const AuthNav = () => {
  const { auth } = useAuthContext()
  return (
    <>
      <li className="p-global-nav__item">
        <Link href={{ pathname: '/help' }} className={clsx('c-header-link')}>
          ヘルプ
        </Link>
      </li>
      <li className="p-global-nav__item">
        <AuthAvatar user={auth.user} />
      </li>
    </>
  )
}
