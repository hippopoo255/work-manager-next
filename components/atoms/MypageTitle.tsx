import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

export type Prop = {
  children: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}))
const MypageTitle = ({ children }: Prop) => {
  const classes = useStyles()
  return (
    <Typography className={classes.root} component="h2" variant="h2">
      {children}
    </Typography>
  )
}

MypageTitle.propTypes = {
  children: PropTypes.node,
}

export default MypageTitle
