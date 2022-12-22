'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { schema, SignInFormType } from '~/schema/auth/signInValidator'
import { useAuthContext } from '~/services/auth'
import { authOperation } from '~/stores/auth'

const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { dispatch } = useAuthContext()
  const router = useRouter()
  const methods = useForm<SignInFormType>({
    mode: 'onBlur',
    defaultValues: {
      user_id: '',
      password: '',
    },

    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback(async (data: SignInFormType) => {
    setLoading(true)
    await authOperation
      .signIn(data, dispatch)
      .then(() => {
        router.prefetch('/mypage')
        router.push('/mypage')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return {
    loading,
    onSubmit,
    FormProvider,
    methods,
  }
}

export default useSignIn