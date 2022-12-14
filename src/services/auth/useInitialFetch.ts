import { useEffect } from 'react'
import { useAuthContext } from '~/services/auth'
import { authOperation } from '~/stores/auth'

const useInitialFetch = () => {
  const { auth, dispatch } = useAuthContext()

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      const init = async () => {
        await authOperation.currentUser(dispatch)
      }
      init()
    }

    return () => {
      isMounted = false
    }
  }, [])

  return { auth }
}

export default useInitialFetch
