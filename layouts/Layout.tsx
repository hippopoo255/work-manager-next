import React from 'react'
import { Header, Footer } from '@/components/organisms'
import styles from '@/assets/stylesheets/components/Layout.module.scss'
import Head from 'next/head'
import { User } from '@/interfaces/models'
import useApi, { httpClient } from '@/api/useApi'
import requests from '@/Requests'
import { useRouter } from 'next/router'
import { SITE_TITLE } from '@/lib/util'

export type LayoutOrg = {
  children: React.ReactNode
  title?: string
}

const Layout = ({ children, title }: LayoutOrg) => {
  const router = useRouter()

  const req = () => {
    return httpClient.get(requests.currentUser)
  }
  const user = useApi<User | ''>(req, '')

  return (
    <>
      <Head>
        <title>{!!title ? `${title} | ${SITE_TITLE}` : SITE_TITLE}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.head}>
          <Header user={user} />
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
