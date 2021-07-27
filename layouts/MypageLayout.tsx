import React from 'react'
import { Header, Footer, Sidebar } from '@/components/organisms'
import styles from '@/assets/stylesheets/components/MypageLayout.module.scss'

const MypageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Header />
      </div>
      <div className={styles.body}>
        <aside className={styles.side}>
          <Sidebar />
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
      <div className={styles.tail}>
        <Footer />
      </div>
    </div>
  )
}

export default MypageLayout
