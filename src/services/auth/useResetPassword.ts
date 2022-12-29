import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { cognitoUser } from '~/libs/cognito/auth'
import {
  schema,
  ResetPasswordFormType,
} from '~/schema/auth/resetPasswordValidator'
import { useStatus } from '~/services/status'

const useResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { update: updateStatus } = useStatus()
  const router = useRouter()
  const { t } = useTranslation()
  const methods = useForm<ResetPasswordFormType>({
    mode: 'onBlur',
    defaultValues: {
      user_id: router.isReady ? (router.query.code as string) : '',
      password: '',
      verification_code: '',
    },

    resolver: yupResolver(schema({ t })),
  })

  const onSubmit = useCallback(async (inputs: ResetPasswordFormType) => {
    setLoading(true)
    await cognitoUser
      .resetPassword(inputs)
      .then(() => {
        updateStatus({
          message:
            '再設定に成功しました。数秒後サインイン画面に移動しますので、サインインをお試しください',
          statusCode: 200,
          category: 'success',
        })
        router.push('/signin')
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

export default useResetPassword
