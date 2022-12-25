import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { cognitoUser } from '~/libs/cognito/auth'
import {
  schema,
  SendPasswordForgottenFormType as FormType,
} from '~/schema/auth/sendPasswordForgottenValidation'
import { useStatus } from '~/services/status'

const useSendPasswordForgotten = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const { update: updateStatus, clear } = useStatus()
  const router = useRouter()
  const methods = useForm<FormType>({
    mode: 'onBlur',
    defaultValues: {
      user_id: '',
    },

    resolver: yupResolver(schema),
  })

  const onSubmit = useCallback(async (data: FormType) => {
    setLoading(true)
    await cognitoUser
      .sendPasswordForgotten(data)
      .then((encodedUserName) => {
        updateStatus({
          message: '検証コードを送信しました。',
          statusCode: 200,
          category: 'success',
        })
        router.prefetch('/password-reset')
        router.push(`/password-reset?code=${encodedUserName}`)
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

export default useSendPasswordForgotten
