import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React, { useState } from 'react'
import { Hamburger } from '../../Hamburger'
import { ThemeToggle } from '~/components/elements/Toggle'

const GlobalNav = () => {
  const [open, setOpen] = useState(false)

  const { t } = useTranslation()

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <Hamburger open={open} onToggle={handleToggle}>
      <nav className="p-global-nav">
        <ul className="p-global-nav__menu">
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
        <div className="p-global-nav__option">
          <ThemeToggle />
        </div>
      </nav>
    </Hamburger>
  )
}

export default GlobalNav
