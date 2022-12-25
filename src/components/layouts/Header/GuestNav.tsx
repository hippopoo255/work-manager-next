import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

export const GuestNav = () => {
  return (
    <>
      <li className="p-global-nav__item">
        <Link href={{ pathname: 'signin' }} className={clsx('c-header-link')}>
          Sign In
        </Link>
      </li>
      <li className="p-global-nav__item">
        <Link href={{ pathname: 'signup' }} className={clsx('c-header-link')}>
          Sign Up
        </Link>
      </li>
    </>
  )
}
