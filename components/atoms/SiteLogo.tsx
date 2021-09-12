import React from 'react'
import { Typography, Box } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core'
import Image from 'next/image'

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    display: 'inline-block',
    padding: theme.spacing(1),
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  overline: {
    lineHeight: 1.3,
  },
}))
const SiteLogo = () => {
  const classes = useStyles()
  return (
    <Box className={classes.logo}>
      <Box>
        <Image
          src={'/site_icon_white.svg'}
          alt="site icon"
          height={28}
          width={32}
        />
      </Box>
      <Typography
        className={classes.overline}
        variant={'overline'}
        color={'inherit'}
        component={'p'}
      >
        JYOBU SAPO
      </Typography>
    </Box>
  )
}

export default SiteLogo
