import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'

export type Props = {
  children: React.ReactNode
  center?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    maxWidth: 600,
  },
  center: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    display: 'inline-block',
    textAlign: 'left',
    lineHeight: 1.5,
  },
}))
const MypageTitle = ({ children, center }: Props) => {
  const classes = useStyles()
  return (
    <Typography
      className={clsx(classes.root, {
        [classes.center]: !!center,
      })}
      component="h2"
    >
      <Typography variant="h2" component="span" className={classes.text}>
        {children}
      </Typography>
    </Typography>
  )
}

MypageTitle.propTypes = {
  children: PropTypes.node,
}

export default MypageTitle
