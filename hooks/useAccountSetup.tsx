import React, { useState, useEffect, useMemo } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { SignupInputs } from '@/interfaces/form/inputs'
import { useRouter } from 'next/router'
import { decode64 } from '@/lib/util'
import { useAuth } from '@/hooks'
import { AxiosError } from 'axios'
// アラート
import { AlertStatus } from '@/interfaces/common'
import { initialAlertStatus } from '@/lib/initialData'

type Props = {
  duplicateValidationKey?: 'email' | 'login_id'
}
const useAccountSetup = ({ duplicateValidationKey = 'email' }: Props = {}) => {
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<SignupInputs>()

  const router = useRouter()
  const queries = useMemo(() => router.query, [router])
  const ignore = ['address', 'login_id', 'password']
  const [loading, setLoading] = useState<boolean>(false)
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    ...initialAlertStatus,
  })

  const { signup, duplicateEmailCount } = useAuth()

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    setLoading(true)
    const isDuplicate = await isDuplicateEmail(data.email)
    if (isDuplicate) {
      setLoading(false)
      return false
    }
    await signup(data).catch(({ key, message }) => {
      setLoading(false)
      setError(key, {
        type: 'invalid',
        message,
      })
    })
  }

  const isDuplicateEmail = async (email: SignupInputs['email']) => {
    return await duplicateEmailCount(email)
      .then((count: number) => {
        if (count > 0) {
          setError(duplicateValidationKey, {
            type: 'validate',
            message: 'メールアドレスまたはIDが登録済みです',
          })
        } else {
          clearErrors('email')
        }
        // \!!count...isDuplicate
        return !!count
      })
      .catch((err: AxiosError['response']) => {
        setAlertStatus((prev) => ({
          ...prev,
          severity: 'error',
          msg: 'ネットワークエラーです。お手数ですが時間を空けて再度お試しください。',
          show: true,
        }))
        const hasError = 1
        return !!hasError
      })
  }

  useEffect(() => {
    if (queries !== undefined) {
      Object.keys(queries).forEach((key) => {
        const nakedKey = key as keyof SignupInputs
        const value = queries[nakedKey]
        if (!ignore.includes(key)) {
          setValue(nakedKey, decode64(String(value)))
        }
      })
    }
  }, [queries])

  return {
    alertStatus,
    setAlertStatus,
    control,
    errors,
    handleSubmit,
    loading,
    onSubmit,
  }
}

export default useAccountSetup
