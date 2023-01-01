import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Hamburger } from '../../Hamburger'
import { ThemeToggle } from '~/components/elements/Toggle'

const GlobalNav = () => {
  const [open, setOpen] = useState(false)

  const { t } = useTranslation()
  const router = useRouter()

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleLink = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    path: string
  ) => {
    e.preventDefault()
    handleToggle()
    router.push(path)
  }

  return (
    <Hamburger open={open} onToggle={handleToggle}>
      <nav className="p-global-nav">
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
