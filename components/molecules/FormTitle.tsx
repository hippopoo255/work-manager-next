import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Avatar, Typography } from '@material-ui/core'
import MenuBookOutlinedIcon from '@material-ui/icons/MenuBookOutlined'
import PropTypes from 'prop-types'

type Props = {
  icon: React.ReactNode
  title: string
}

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    margin: 0,
    background: 'linear-gradient(135deg,#fad961,#f76b1c)',
    boxShadow: theme.shadows[2],
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}))

const FormTitle = ({ icon, title }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.title}>
      <Avatar className={classes.avatar}>{icon}</Avatar>
      <Typography component="h3" variant="h5">
        {title}
      </Typography>
    </div>
  )
}

FormTitle.propTypes = {
  icon: PropTypes.object,
}

FormTitle.defaultProps = {
  icon: <MenuBookOutlinedIcon />,
}

export default FormTitle
