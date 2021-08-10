import React, { useState } from 'react'
import { MypageHeader as Header, Footer, Sidebar } from '@/components/organisms'
import styles from '@/assets/stylesheets/components/MypageLayout.module.scss'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { User } from '@/interfaces/models'
import useApi, { httpClient } from '@/api/useApi'
import requests from '@/Requests'

export type LayoutOrg = {
  children: React.ReactNode
  title?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: '100%',
    },
    // necessary for main to be below app bar
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '100%',
      overflow: 'hidden',
    },
    main: {
      padding: theme.spacing(3),
      flexGrow: 1,
    },
  })
)

const MypageLayout = ({ children, title }: LayoutOrg) => {
  const req = () => {
    return httpClient.get(requests.currentUser)
  }
  const user = useApi<User | ''>(req, '')

  const classes = useStyles()
  const suffix = process.env.NEXT_PUBLIC_SITE_NAME
  const [mobileOpen, setMobileOpen] = useState(false)
  const handleDrawerToggle = (specified: boolean | null = null) => {
    if (specified === null) {
      setMobileOpen(!mobileOpen)
    } else {
      setMobileOpen(specified)
    }
  }

  return (
    <>
      <Head>
        <title>{!!title ? `${title} | ${suffix}` : suffix}</title>
      </Head>
      <div className={classes.root}>
        <CssBaseline />
        <Header toggleMenu={handleDrawerToggle} user={user} />
        <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />
        <div className={classes.content}>
          <main className={classes.main}>
            <div className={classes.appBarSpacer} />
            {children}
          </main>
          <div className={styles.tail}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default MypageLayout
