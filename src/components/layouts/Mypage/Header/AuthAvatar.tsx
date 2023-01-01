import React, { useMemo, useState } from 'react'
import AuthMenu from './AuthMenu'
import { Avatar } from '~/components/elements/Avatar'
import { STORAGE_URL } from '~/config'
import { User } from '~/schema/generated/@types'

type Props = {
  user: User
}

const AuthAvatar = ({ user }: Props) => {
  const [open, setOpen] = useState(false)

  const iconPath = useMemo(
    () =>
      (user.file_path ?? '') === ''
        ? undefined
        : `${STORAGE_URL}/${user.file_path}`,
    [user]
  )
  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  const handleLink = () => {
    setOpen(false)
  }

  return (
    <div className={`p-auth-avatar${open ? ' --open' : ''}`}>
      <Avatar onClick={handleClick} filePath={iconPath} name={user.full_name} />
      <div className={`p-auth-avatar__overlay`} onClick={handleClick}></div>
      <div className="p-auth-avatar__menu">
        <AuthMenu
          user={user}
          onLink={handleLink}
          className={open ? ' --open' : ''}
        />
      </div>
    </div>
  )
}

export default AuthAvatar
