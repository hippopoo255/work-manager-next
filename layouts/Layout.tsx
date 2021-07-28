import React from 'react'
import { Header, Footer } from '@/components/organisms'
import styles from '@/assets/stylesheets/components/Layout.module.scss'
import Head from 'next/head'

export type LayoutOrg = {
  children: React.ReactNode
  title?: string
}

const Layout = ({ children, title }: LayoutOrg) => {
  const suffix = process.env.NEXT_PUBLIC_SITE_NAME
  return (
    <>
      <Head>
        <title>{!!title ? `${title} | ${suffix}` : suffix}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.head}>
          <Header />
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
