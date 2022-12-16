'use client'

import { useInitialFetch } from '~/services/auth'
export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { auth } = useInitialFetch()

  return <>{children}</>
}
