import React from 'react'
import styles from '@/assets/stylesheets/components/Footer.module.scss'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { SITE_TITLE } from '@/lib/util'

const Footer = () => {
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
        <div>
          Logo created by{' '}
          <a href="https://www.designevo.com/" title="Free Online Logo Maker">
            DesignEvo logo maker
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
