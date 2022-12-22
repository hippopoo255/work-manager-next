import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { authOperation } from '~/stores/auth'

const useSignOut = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { dispatch } = useAuthContext()
  const router = useRouter()

  const signOut = useCallback(async () => {
    setLoading(true)
    await authOperation
      .signOut(dispatch)
      .then(() => {
        router.prefetch('/signin')
        router.push('/signin')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    signOut,
  }
}

export default useSignOut
