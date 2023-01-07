import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React, { useState } from 'react'
import { Hamburger } from '../../Hamburger'
import { ThemeToggle } from '~/components/elements/Toggle'
import { useLink } from '~/services/events/link'

const GlobalNav = () => {
  const [open, setOpen] = useState(false)
  const handleToggle = () => {
    setOpen(!open)
  }

  const { t } = useTranslation()
  const { router, handleLink } = useLink({ onLink: handleToggle })

  return (
    <Hamburger open={open} onToggle={handleToggle} under="lg">
      <nav className="p-global-nav">
        <Link
          href={{ pathname: '/' }}
          className={'p-global-nav__top'}
          onClick={(e) => handleLink(e, '/')}
        >
          <h1>{t('siteTitle')}</h1>
        </Link>
        <ul className="p-global-nav__menu">
          <li className="p-global-nav__item">
            <Link
              href={{ pathname: '/help' }}
              className={clsx('c-header-link', {
                '--current': router.pathname === '/help',
              })}
              onClick={(e) => handleLink(e, '/help')}
            >
              {t('header.help')}
            </Link>
          </li>
          <li className="p-global-nav__item">
            <Link
              href={{ pathname: 'signin' }}
              className={clsx('c-header-link', {
                '--current': router.pathname === '/signin',
              })}
              onClick={(e) => handleLink(e, 'signin')}
            >
              {t('header.signIn')}
            </Link>
          </li>
          <li className="p-global-nav__item">
            <Link
              href={{ pathname: 'signup' }}
              className={clsx('c-header-link', {
                '--current': router.pathname === '/signup',
              })}
              onClick={(e) => handleLink(e, 'signup')}
            >
              {t('header.signUp')}
            </Link>
          </li>
        </ul>
        <div className="p-global-nav__option">
          <ThemeToggle />
        </div>
      </nav>
    </Hamburger>
  )
}

export default GlobalNav
