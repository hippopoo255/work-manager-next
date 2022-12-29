import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  schema,
  AccountVerificationFormType,
} from '~/schema/auth/verifyUserValidator'
import { useStatus } from '~/services/status'
import { authOperation } from '~/stores/auth'

const useVerifyUser = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { update: updateStatus } = useStatus()
  const router = useRouter()
  const { t } = useTranslation()
  const methods = useForm<AccountVerificationFormType>({
    mode: 'onBlur',
    defaultValues: {
      user_id: router.isReady ? (router.query.code as string) : '',
      verification_code: '',
    },

    resolver: yupResolver(schema({ t })),
  })

  const onSubmit = useCallback(async (inputs: AccountVerificationFormType) => {
    setLoading(true)
    await authOperation
      .verifyUser(inputs)
      .then(() => {
        updateStatus({
          message: '検証に成功しました',
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

export default useVerifyUser
