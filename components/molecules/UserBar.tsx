import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { UserAvatar } from '@/components/atoms'
import { User } from '@/interfaces/models'
import { Variant } from '@material-ui/core/styles/createTypography'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => ({
  top: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: '4px 0',
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}))
type Props = {
  user: User
  text?: React.ReactNode
  variant?: 'inherit' | Variant | undefined
  bold?: boolean
}

const UserBar = ({ user, text, variant = 'body2', bold = false }: Props) => {
  const classes = useStyles()
  return (
    <Box alignItems={'center'} className={classes.top}>
      <UserAvatar user={user} />
      <Typography
        component={'span'}
        variant={variant}
        color={'textSecondary'}
        className={clsx({
          [classes.bold]: !!bold,
        })}
      >
        {text || `${user.full_name}さん`}
      </Typography>
    </Box>
  )
}
export default UserBar
