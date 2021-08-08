import React from 'react'
import { makeStyles, Theme } from '@material-ui/core'
import { Typography } from '@material-ui/core'

type Props = {
  msg: string | undefined
}

const useStyles = makeStyles((theme: Theme) => ({
  msg: {
    fontSize: '90%',
    margin: `${theme.spacing(1)} 0 0`,
  },
}))

const FormErrorMessage = ({ msg }: Props) => {
  const classes = useStyles()
  return (
    <Typography color="error" component="small" className={classes.msg}>
      {msg}
    </Typography>
  )
}

export default FormErrorMessage
