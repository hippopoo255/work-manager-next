import React from 'react'
import { Header, Footer } from '@/components/organisms'
import styles from '@/assets/stylesheets/components/Layout.module.scss'
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
      <div className={styles.container}>
        <div className={styles.head}>
          <Header noShadow={!!noShadow} />
        </div>
        <div className={styles.body}>
          <main className={styles.main}>{children}</main>
        </div>
        <div className={styles.tail}>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Layout
