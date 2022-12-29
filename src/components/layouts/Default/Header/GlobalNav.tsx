import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '~/components/elements/Toggle'

const GlobalNav = () => {
  const { t } = useTranslation()
  return (
    <nav className="p-global-nav">
      <ul className="p-global-nav__menu">
        <li className="p-global-nav__item grid grid-flow-col place-content-center place-items-center">
          <ThemeToggle />
        </li>
        <li className="p-global-nav__item">
          <Link href={{ pathname: '/help' }} className={'c-header-link'}>
            {t('header.help')}
          </Link>
        </li>
        <li className="p-global-nav__item">
          <Link href={{ pathname: 'signin' }} className={'c-header-link'}>
            {t('header.signIn')}
          </Link>
        </li>
        <li className="p-global-nav__item">
          <Link href={{ pathname: 'signup' }} className={'c-header-link'}>
            {t('header.signUp')}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default GlobalNav
