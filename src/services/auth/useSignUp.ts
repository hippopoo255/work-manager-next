import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { schema, SignUpFormType } from '~/schema/auth/signUpValidator'
import { useStatus } from '~/services/status'
import { authOperation } from '~/stores/auth'

const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { update: updateStatus } = useStatus()
  const router = useRouter()
  const { t } = useTranslation()
  const methods = useForm<SignUpFormType>({
    mode: 'onBlur',
    defaultValues: {
      user_id: '',
      password: '',
    },

    resolver: yupResolver(schema({ t })),
  })

  const onSubmit = useCallback(async (inputs: SignUpFormType) => {
    setLoading(true)
    await authOperation
      .signUp(inputs)
      .then((encodedUserName) => {
        updateStatus({
          message: '検証コードを送信しました。',
          statusCode: 200,
          category: 'success',
        })
        router.push(`/account-verification?code=${encodedUserName}`)
      })
      .catch((err) => {
        setLoading(false)
        updateStatus({
          message: err.message,
          statusCode: 400,
          category: 'error',
        })
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
