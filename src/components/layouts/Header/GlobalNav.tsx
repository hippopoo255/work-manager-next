'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AuthNav } from './AuthNav'
import { GuestNav } from './GuestNav'
import { ThemeToggle } from '~/components/elements/Toggle'
import { useInitialFetch } from '~/services/auth'
import { isRequiredAuthenticatedPaths } from '~/utils'

const GlobalNav = () => {
  const { auth } = useInitialFetch()

  const [requiredAuthenticatedPage, setRequiredAuthenticatedPage] =
    useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setRequiredAuthenticatedPage(isRequiredAuthenticatedPaths(pathname ?? ''))
  }, [pathname])

  return (
    <nav className="p-global-nav">
      <ul className="p-global-nav__menu">
        <li className="p-global-nav__item grid grid-flow-col place-content-center place-items-center">
          <ThemeToggle />
          {/* <div className="text-accent ml-2">ダークモード</div> */}
        </li>
        {requiredAuthenticatedPage ? (
          auth.isSignedIn && <AuthNav />
        ) : (
          <GuestNav />
        )}
      </ul>
    </nav>
  )
}

export default GlobalNav
