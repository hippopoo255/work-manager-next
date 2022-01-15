import React, { useState, useEffect } from 'react'
import { MypageHeader as Header, Footer, Sidebar } from '@/components/organisms'
import styles from '@/assets/stylesheets/components/MypageLayout.module.scss'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { useAuth, useLocale } from '@/hooks'

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
  const classes = useStyles()
  const { auth } = useAuth()
  const { t } = useLocale()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tabletOpen, setTabletOpen] = useState(false)
  const handleDrawerToggle = (flag: string) => {
    if (flag === 'mobile') {
      handleMobileDrawer()
    } else {
      handleFlexibleDrawer()
    }
  }
  const handleMobileDrawer = (specified: boolean | null = null) => {
    if (specified === null) {
      setMobileOpen(!mobileOpen)
    } else {
      setMobileOpen(specified)
    }
  }
  const handleFlexibleDrawer = (specified: boolean | null = null) => {
    if (specified === null) {
      setTabletOpen(!tabletOpen)
    } else {
      setTabletOpen(specified)
    }
  }
  return (
    <>
      <Head>
        <title>{!!title ? `${title} | ${t.siteTitle}` : t.siteTitle}</title>
      </Head>
      <div className={classes.root}>
        <CssBaseline />
        <Header toggleMenu={handleDrawerToggle} />
        <Sidebar
          open={mobileOpen}
          onClose={handleMobileDrawer}
          flexibleOpen={tabletOpen}
          handleFlexibleOpen={handleFlexibleDrawer}
        />
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
