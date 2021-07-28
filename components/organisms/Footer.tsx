import React from 'react'
import styles from '@/assets/stylesheets/components/Footer.module.scss'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'

const Footer = () => {
  const Copyright = () => {
    return (
      <Typography variant="body2" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          {process.env.NEXT_PUBLIC_SITE_NAME || ''}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
  }

  return (
    <footer className={styles.footer}>
      <Box className="container">
        <Copyright />
      </Box>
    </footer>
  )
}

export default Footer
