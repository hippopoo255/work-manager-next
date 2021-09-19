import React from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => ({
  wrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  clear: {
    color: theme.palette.success.main,
    fontWeight: theme.typography.fontWeightBold,
  },
  pending: {
    color: theme.palette.grey[400],
    fontWeight: theme.typography.fontWeightBold,
  },
  safe: {},
}))

type Props = {
  status?: string
  value: string
}

const StatusText = ({ value, status }: Props) => {
  const classes = useStyles()
  const statusColor = () => {
    switch (status) {
      case 'clear':
        return classes.clear
      case 'pending':
        return classes.pending
      default:
        return classes.safe
    }
  }
  const textByStatus = () => {
    switch (status) {
      case 'over':
        return status.toUpperCase()
      case 'warning':
        return status.toUpperCase()
      default:
        return ''
    }
  }

  return (
    <span className={classes.wrap}>
      <span className={statusColor()}>{value}</span>
      {/* <small className={statusColor()}>{textByStatus()}</small> */}
    </span>
  )
}

export default StatusText
