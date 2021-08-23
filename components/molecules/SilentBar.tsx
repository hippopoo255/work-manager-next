import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
const useStyles = makeStyles((theme: Theme) => ({
  bar: {
    padding: theme.spacing(2),
    position: 'relative',
    zIndex: 1,
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1,
  },
  msgBody: {
    color: theme.palette.common.white,
    width: '100%',
    overflow: 'hidden',
  },
  sub: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  main: {
    fontWeight: theme.typography.fontWeightBold,
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))
export type Props = {
  main: string
  sub: string
  onClick: () => void
}

const SilentBar = ({ main, sub, onClick }: Props) => {
  const classes = useStyles()

  return (
    <Box className={classes.bar} onClick={onClick}>
      <div className={classes.bgFill}></div>
      <div className={classes.msgBody}>
        <Typography className={classes.sub} variant={'body2'}>
          {sub}
        </Typography>
        <Typography className={classes.main} variant={'body1'}>
          {main}
        </Typography>
      </div>
    </Box>
  )
}

export default SilentBar
