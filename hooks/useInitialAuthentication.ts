import { useContext, useEffect } from 'react'
import { AuthContext } from '@/provider/AuthProvider'
import { authOperation } from '@/globalState/user/operation'
import { handleRedirectByAuth } from '@/lib/route'
import router from 'next/router'

const useInitialAuthentication = (canGuest: boolean = false) => {
  const { auth, dispatch } = useContext(AuthContext)

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const init = async () => {
        const loggedInUser = await authOperation.currentUser(dispatch)
        if (!canGuest) {
          handleRedirectByAuth(loggedInUser)
        }
      }
      init()
    }
    return () => {
      isMounted = false
    }
  }, [])

  return {
    auth,
    dispatch,
    router,
  }
}

export default useInitialAuthentication
