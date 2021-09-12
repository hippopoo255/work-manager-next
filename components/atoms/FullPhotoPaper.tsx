import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import { STORAGE_URL } from '@/lib/util'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: '100%',
    height: '100%',
    minHeight: 88,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    [theme.breakpoints.down('xs')]: {},
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
