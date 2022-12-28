import Link from 'next/link'
import React from 'react'
import AuthAvatar from './AuthAvatar'
import { ThemeToggle } from '~/components/elements/Toggle'
import { useAuthContext } from '~/services/auth'

export const AuthNav = () => {
  const { auth } = useAuthContext()
  return (
    <nav className="p-auth-nav">
      <ul className="p-auth-nav__menu">
        <li className="p-auth-nav__item grid grid-flow-col place-content-center place-items-center">
          <ThemeToggle />
        </li>
        <li className="p-auth-nav__item">
          <Link href={{ pathname: '/help' }} className={'c-header-link'}>
            ヘルプ
          </Link>
        </li>
        <li className="p-auth-nav__item">
          <AuthAvatar user={auth.user} />
        </li>
      </ul>
    </nav>
  )
}
