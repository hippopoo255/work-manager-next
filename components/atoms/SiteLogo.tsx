import React from 'react'
import { Typography, Link } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core'
import { SITE_TITLE } from '@/lib/util'

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: 'inline-block',
    cursor: 'pointer',
  },
  link: {
    color: theme.palette.common.white,
    transition: '300ms',
    '&:hover': {
      textDecoration: 'none',
      opacity: '.7',
    },
  },
}))
const SiteLogo = () => {
  const classes = useStyles()
  return (
    <Typography variant="h2" component={'h1'} className={classes.logo}>
      <Link href="/" className={classes.link}>
        {SITE_TITLE}
      </Link>
    </Typography>
  )
}

export default SiteLogo
