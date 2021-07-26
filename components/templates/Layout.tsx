import React from 'react'
import {Header, Footer} from 'components/organisms'
import styles from '@/assets/stylesheets/components/Layout.module.scss'
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Header />
      </div>
      <div className={styles.body}>{children}</div>
      <div className={styles.tail}>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
