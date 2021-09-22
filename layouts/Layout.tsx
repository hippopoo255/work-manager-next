import React from 'react'
import { Header, Footer } from '@/components/organisms'
import styles from '@/assets/stylesheets/components/Layout.module.scss'
import Head from 'next/head'
import { useAuth } from '@/hooks'
import { SITE_TITLE } from '@/lib/util'

export type LayoutOrg = {
  children: React.ReactNode
  title?: string
  noShadow?: boolean
}

const Layout = ({ children, title, noShadow }: LayoutOrg) => {
  const { auth } = useAuth(true)
  return (
    <>
      <Head>
        <title>{!!title ? `${title} | ${SITE_TITLE}` : SITE_TITLE}</title>
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
