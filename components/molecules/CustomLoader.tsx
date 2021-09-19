import React, { useEffect, useRef } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      minHeight: 120,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  })
)

type Props = {
  colorClasses?: any
}

const CustomLoader = ({ colorClasses }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CircularProgress classes={colorClasses} />
    </div>
  )
}

export default CustomLoader
