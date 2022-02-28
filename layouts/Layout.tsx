import React from 'react'
import { Header, Footer } from '@/components/organisms'
import layout from '@/assets/scss/Layout/l-layout.module.scss'
import Head from 'next/head'
import { useInitialAuthentication, useLocale } from '@/hooks'

export type LayoutOrg = {
  children: React.ReactNode
  title?: string
  noShadow?: boolean
  canGuest?: boolean
}

const Layout = ({ children, title, noShadow, canGuest = true }: LayoutOrg) => {
  const { auth } = useInitialAuthentication(canGuest)
  const { t } = useLocale()
  return (
    <>
      <Head>
        <title>{!!title ? `${title} | ${t.siteTitle}` : t.siteTitle}</title>
      </Head>
      <div className={layout.root}>
        <div className={layout.head}>
          <Header noShadow={!!noShadow} />
        </div>
        <div className={layout.body}>
          <main className={layout.main}>{children}</main>
        </div>
        <div className={layout.tail}>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
