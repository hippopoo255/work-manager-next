'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { cognitoUser } from '~/libs/cognito/auth'
import {
  schema,
  ResetPasswordFormType,
} from '~/schema/auth/resetPasswordValidator'
import { useStatus } from '~/services/status'
import { decode64 } from '~/utils'

const useResetPassword = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { update: updateStatus } = useStatus()
  const router = useRouter()
  const params = useSearchParams()
  const methods = useForm<ResetPasswordFormType>({
    mode: 'onBlur',
    defaultValues: {
      user_id: params.get('code') ?? '',
      password: '',
      verification_code: '',
    },

    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback(async (data: ResetPasswordFormType) => {
    setLoading(true)
    await cognitoUser
      .resetPassword(data)
      .then(() => {
        updateStatus({
          message:
            '再設定に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください',
          statusCode: 200,
          category: 'success',
        })
        router.prefetch('/signin')
        router.push('/signin')
      })
      .catch((err) => {
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
