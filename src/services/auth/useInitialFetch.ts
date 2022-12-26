'use client'

import { useEffect } from 'react'
import { useAuthContext } from '~/services/auth'
import { authOperation } from '~/stores/auth'
import { AuthState } from '~/stores/auth/types'

type Props = {
  user?: AuthState['user']
}
const useInitialFetch = ({ user }: Props = {}) => {
  const { auth, dispatch } = useAuthContext()

  useEffect(() => {
    let isMounted = true

    if (isMounted) {
      const init = async () => {
        await authOperation.currentUser(dispatch, user)
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
