import React from 'react'
import styles from '@/assets/stylesheets/components/Footer.module.scss'
import { Box, Typography } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { SITE_TITLE } from '@/lib/util'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  logoby: {
    position: 'absolute',
    pointerEvents: 'none',
    color: 'transparent',
  },
}))

const Footer = () => {
  const classes = useStyles()
  const Copyright = () => {
    return (
      <Typography variant="body2" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          {SITE_TITLE}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
  }

  return (
    <footer className={styles.footer}>
      <div className="container">
        <Copyright />
        <Box className={classes.logoby}>
          Logo created by{' '}
          <a href="https://www.designevo.com/" title="Free Online Logo Maker">
            DesignEvo logo maker
          </a>
        </Box>
      </div>
    </footer>
  )
}

export default Footer
