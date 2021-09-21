import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { getRequest, requestUri } from '@/api'
import { User } from '@/interfaces/models'
import { AuthContext } from '@/provider/AuthProvider'
import { currentUserAction } from '@/globalState/user/action'
import { ChatRoom } from '@/interfaces/models'

const useAuthWithChat = (canGuest: boolean = false) => {
  const router = useRouter()
  const { auth, dispatch } = useContext(AuthContext)

  useEffect(() => {
    let isMounted = true
    const func = async () => {
      const res = await getRequest<User | ''>(requestUri.currentUserWithChat)
      if (!!res && isMounted) {
        res.chat_rooms.sort(
          (p: ChatRoom, n: ChatRoom) =>
            new Date(n.latest_message_date).getTime() -
            new Date(p.latest_message_date).getTime()
        )
      }
      dispatch(currentUserAction(res))
      if (res === '' && !canGuest) {
        router.push('/login')
      }
    }
    func()
    return () => {
      isMounted = false
    }
  }, [])
  return { auth, dispatch }
}

export default useAuthWithChat
