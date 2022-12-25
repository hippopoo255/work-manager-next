'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AuthNav } from './AuthNav'
import { GuestNav } from './GuestNav'
import { useAuthContext } from '~/services/auth'
import { isRequiredAuthenticatedPaths } from '~/utils'

const GlobalNav = () => {
  const [requiredAuthenticatedPage, setRequiredAuthenticatedPage] =
    useState(true)
  const pathname = usePathname()
  const { auth } = useAuthContext()

  useEffect(() => {
    setRequiredAuthenticatedPage(isRequiredAuthenticatedPaths(pathname ?? ''))
  }, [pathname])

  return (
    <nav className="p-global-nav">
      <ul className="p-global-nav__menu">
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
