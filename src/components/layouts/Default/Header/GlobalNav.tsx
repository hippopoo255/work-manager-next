import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '~/components/elements/Toggle'

const GlobalNav = () => {
  return (
    <nav className="p-global-nav">
      <ul className="p-global-nav__menu">
        <li className="p-global-nav__item grid grid-flow-col place-content-center place-items-center">
          <ThemeToggle />
        </li>
        <li className="p-global-nav__item">
          <Link href={{ pathname: '/help' }} className={'c-header-link'}>
            ヘルプ
          </Link>
        </li>
        <li className="p-global-nav__item">
          <Link href={{ pathname: 'signin' }} className={'c-header-link'}>
            Sign In
          </Link>
        </li>
        <li className="p-global-nav__item">
          <Link href={{ pathname: 'signup' }} className={'c-header-link'}>
            Sign Up
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default GlobalNav
