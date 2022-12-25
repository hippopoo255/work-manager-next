'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'

import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  schema,
  AccountVerificationFormType,
} from '~/schema/auth/verifyUserValidator'
import { useStatus } from '~/services/status'
import { authOperation } from '~/stores/auth'
import { decode64 } from '~/utils'

const useVerifyUser = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { update: updateStatus } = useStatus()
  const router = useRouter()
  const params = useSearchParams()
  const methods = useForm<AccountVerificationFormType>({
    mode: 'onBlur',
    defaultValues: {
      user_id: params.get('code') ?? '',
      verification_code: '',
    },

    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback(async (data: AccountVerificationFormType) => {
    setLoading(true)
    await authOperation
      .verifyUser(data)
      .then(() => {
        updateStatus({
          message: '検証に成功しました',
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

export default useVerifyUser
