import React from 'react'
import { AvatarMenu, NotificationIcon } from '@/components/molecules'
import { User } from '@/interfaces/models'
import { Box } from '@material-ui/core'
type Props = {
  user: User
}

const AuthMenu = ({ user }: Props) => {
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Box style={{ zIndex: 1 }}>
        <NotificationIcon user={user} />
      </Box>
      <Box pl={1}>
        <AvatarMenu user={user} />
      </Box>
    </Box>
  )
}

export default AuthMenu
