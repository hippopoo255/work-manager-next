import router from 'next/router'
import { AuthContext } from '@/provider/AuthProvider'
import { useContext, useEffect, useMemo } from 'react'
import { requestUri } from '@/api'
import { ChatRoom } from '@/interfaces/models'
import { authOperation } from '@/globalState/user/operation'

const useInitialAuthenticationOnChat = (canGuest: boolean = false) => {
  const { auth, dispatch } = useContext(AuthContext)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const init = async () => {
        const loggedInUserWithChat = await authOperation.currentUser(
          dispatch,
          requestUri.currentUserWithChat
        )
        if (loggedInUserWithChat === '' && !canGuest) {
          router.push('/login')
        }
        if (loggedInUserWithChat !== '' && router.pathname === '/login') {
          router.push('/')
        }
        if (!!loggedInUserWithChat && isMounted) {
          loggedInUserWithChat.chat_rooms.sort(
            (p: ChatRoom, n: ChatRoom) =>
              new Date(n.latest_message_date).getTime() -
              new Date(p.latest_message_date).getTime()
          )
        }
      }
      init()
    }
    return () => {
      isMounted = false
    }
  }, [])

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: auth.user.jwt || '',
      },
    }
  }, [auth])

  return { auth, config, dispatch }
}

export default useInitialAuthenticationOnChat
