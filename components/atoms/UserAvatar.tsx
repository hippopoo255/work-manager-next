import React from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { deepOrange } from '@material-ui/core/colors'
import { Avatar } from '@material-ui/core'
import { User } from '@/interfaces/models'
import { STORAGE_URL } from '@/lib/util'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: theme.palette.secondary.main,
    },
    onSrc: {
      backgroundColor: theme.palette.grey[100],
    },
  })
)

export type Props = {
  user: User
}
export type Letter = () => string

const UserAvatar = ({ user }: Props) => {
  const classes = useStyles()
  const letter: Letter = () => (!!user ? user.family_name.slice(0, 1) : '')
  const avatarSrc =
    !!user && !!user.file_path ? `${STORAGE_URL}/${user.file_path}` : ''

  return (
    <Avatar
      alt={user.family_name}
      src={avatarSrc}
      className={clsx({
        [classes.avatar]: !user.file_path,
        [classes.onSrc]: user.file_path,
      })}
    >
      {letter()}
    </Avatar>
  )
}

export default UserAvatar
