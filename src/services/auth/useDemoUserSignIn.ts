'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuthContext } from '~/services/auth'
import { authOperation } from '~/stores/auth'

const useDemoUserSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { dispatch } = useAuthContext()
  const router = useRouter()

  const onSubmit = async () => {
    setLoading(true)
    await authOperation
      .testSignIn(dispatch)
      .then(() => {
        router.prefetch('/mypage')
        router.push('/mypage')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    loading,
    onSubmit,
  }
}

export default useDemoUserSignIn
