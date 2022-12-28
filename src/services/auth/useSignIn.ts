import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { schema, SignInFormType } from '~/schema/auth/signInValidator'
import { useAuthContext } from '~/services/auth'
import { useStatus } from '~/services/status'
import { authOperation } from '~/stores/auth'

const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { dispatch } = useAuthContext()
  const { update: updateStatus } = useStatus()
  const router = useRouter()
  const methods = useForm<SignInFormType>({
    mode: 'onBlur',
    defaultValues: {
      user_id: '',
      password: '',
    },

    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback(async (inputs: SignInFormType) => {
    setLoading(true)
    await authOperation
      .signIn(inputs, dispatch)
      .then(() => {
        updateStatus({
          message: 'ログインに成功しました',
          statusCode: 200,
          category: 'success',
        })
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
  }, [])

  return {
    loading,
    onSubmit,
    FormProvider,
    methods,
  }
}

export default useSignIn
