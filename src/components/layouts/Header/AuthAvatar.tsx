import React, { useState } from 'react'
import AuthMenu from './AuthMenu'
import { Avatar } from '~/components/elements/Avatar'
import { User } from '~/schema/generated/@types'
type Props = {
  user: User
}

const AuthAvatar = ({ user }: Props) => {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  const handleLink = () => {
    setOpen(false)
  }

  return (
    <div className={`p-auth-avatar`}>
      <Avatar
        onClick={handleClick}
        filePath={user.file_path}
        name={user.full_name}
      />
      <div className="p-auth-avatar__menu">
        {open && <AuthMenu user={user} onLink={handleLink} />}
      </div>
    </div>
  )
}

export default AuthAvatar
