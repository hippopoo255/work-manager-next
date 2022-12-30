import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import { User } from '~/schema/generated/@types'
import { useSignOut } from '~/services/auth'

type Props = {
  user: User
  onLink?: React.MouseEventHandler<HTMLLIElement>
  className?: string
}
const AuthMenu = ({ user, onLink, className }: Props) => {
  const { signOut } = useSignOut()
  const { t } = useTranslation()
  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className={`p-auth-menu${className ?? ''}`}>
      <p className="p-auth-menu__head">{user.full_name}</p>
      <div className="p-auth-menu__body">
        <ul className="p-auth-menu__list">
          <li className="p-auth-menu__item" onClick={onLink}>
            <Link
              href={{ pathname: '/mypage' }}
              className={'p-auth-menu__link'}
            >
              {t('header.authMenu.mypage')}
            </Link>
          </li>
          <li className="p-global-nav__item">
            <button onClick={handleSignOut} className={'p-auth-menu__link'}>
              {t('header.authMenu.signOut')}
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AuthMenu
