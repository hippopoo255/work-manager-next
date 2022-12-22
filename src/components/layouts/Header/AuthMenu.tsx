import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import { User } from '~/schema/generated/@types'
import { useSignOut } from '~/services/auth'

type Props = {
  user: User
  onLink?: React.MouseEventHandler<HTMLLIElement>
}
const AuthMenu = ({ user, onLink }: Props) => {
  const { signOut } = useSignOut()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="p-auth-menu">
      <p className="p-auth-menu__head">{user.full_name}</p>
      <div className="p-auth-menu__body">
        <ul className="p-auth-menu__list">
          <li className="p-auth-menu__item" onClick={onLink}>
            <Link
              href={{ pathname: '/mypage' }}
              className={clsx('p-auth-menu__link')}
            >
              My Page
            </Link>
          </li>
          <li className="p-global-nav__item" onClick={onLink}>
            <Link
              href={{ pathname: '/mypage/minutes' }}
              className={clsx('p-auth-menu__link')}
            >
              議事録
            </Link>
          </li>
          <li className="p-global-nav__item">
            <button
              onClick={handleSignOut}
              className={clsx('p-auth-menu__link')}
            >
              サインアウト
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AuthMenu
