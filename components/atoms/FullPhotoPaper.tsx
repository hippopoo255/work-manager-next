import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import { STORAGE_URL } from '@/lib/util'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: 160,
    height: 160,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: 9999,
    boxShadow: theme.shadows[5],
    [theme.breakpoints.down('xs')]: {
      width: 120,
      height: 120,
    },
  },
}))

type Props = {
  src?: string | undefined
}

const FullPhotoPaper = ({ src }: Props) => {
  const classes = useStyles()
  const bgImage = (src?: string | undefined) => ({
    backgroundImage: `url(${STORAGE_URL}/assets/${src || 'no-image.png'})`,
  })

  return <Paper className={classes.paper} style={bgImage(src)}></Paper>
}

export default FullPhotoPaper
