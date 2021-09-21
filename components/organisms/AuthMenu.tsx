import { useContext } from 'react'
import { AuthContext } from '@/provider/AuthProvider'
import { AvatarMenu, NotificationIcon } from '@/components/molecules'
import { Box } from '@material-ui/core'

const AuthMenu = () => {
  const { auth } = useContext(AuthContext)
  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
      {auth.isLogin && (
        <>
          <Box style={{ zIndex: 1 }}>
            <NotificationIcon />
          </Box>
          <Box pl={1}>
            <AvatarMenu />
          </Box>
        </>
      )}
    </Box>
  )
}

export default AuthMenu
