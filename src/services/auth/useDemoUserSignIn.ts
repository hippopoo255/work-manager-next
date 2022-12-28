import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuthContext } from '~/services/auth'
import { useStatus } from '~/services/status'
import { authOperation } from '~/stores/auth'

const useDemoUserSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { dispatch } = useAuthContext()
  const router = useRouter()
  const { update: updateStatus } = useStatus()
  const onSubmit = async () => {
    setLoading(true)
    await authOperation
      .testSignIn(dispatch)
      .then(() => {
        router.push('/mypage')
      })
      .catch((err) => {
        updateStatus({
          message: err.message,
          statusCode: 400,
          category: 'error',
        })
        setLoading(false)
      })
  }

  return {
    loading,
    onSubmit,
  }
}

export default useDemoUserSignIn
