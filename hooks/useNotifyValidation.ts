import React, { useCallback, useState } from 'react'
import { requestUri } from '@/api'
import { useInitialConnector, useAuth, useRestApi } from '@/hooks'
import { NotifyStatus, AlertStatus } from '@/interfaces/common'
import { SettingInputs } from '@/interfaces/form/inputs'
import { User } from '@/interfaces/models'
import { UseFormSetError } from 'react-hook-form'
import { API_DIRECT_URL } from '@/lib/util'

type Props = {
  setError: UseFormSetError<SettingInputs>
  setAlertStatus: React.Dispatch<React.SetStateAction<AlertStatus>>
}

const useNotifyValidation = ({ setError, setAlertStatus }: Props) => {
  const { auth } = useAuth()
  const { putMethod } = useRestApi()
  const [notifyValidation, setNotifyValidation] = useState<NotifyStatus[]>([])
  const [dailyNotifyValidation, setDailyNotifyValidation] = useState<
    NotifyStatus[]
  >([])

  const { loading } = useInitialConnector<NotifyStatus[]>({
    path: requestUri.notifyStatus + `${auth.user.id}/notify_validation`,
    onSuccess: (fetchedStatus) => {
      setNotifyValidation((prev) =>
        fetchedStatus.filter(
          (notifyValidation) => !notifyValidation.key.match(/^daily_.+$/g)
        )
      )
      setDailyNotifyValidation((prev) =>
        fetchedStatus.filter((notifyValidation) =>
          notifyValidation.key.match(/^daily_.+$/g)
        )
      )
    },
  })

  const updateNotifyValidation = useCallback(
    async (inputs: SettingInputs['notify_validation']) => {
      if (auth.isLogin) {
        const submitData = new FormData()

        Object.keys(inputs).forEach((key) => {
          submitData.append(
            `notify_validation[${key}]`,
            !!inputs[key] ? '1' : '0'
          )
        })

        await putMethod<User, FormData>(
          `/user/${auth.user.id}/setting`,
          submitData,
          undefined,
          undefined,
          API_DIRECT_URL
        )
          .then(() => {
            setAlertStatus((prev) => ({
              ...prev,
              msg: '設定を更新しました',
              severity: 'success',
              show: true,
            }))
          })
          .catch((err) => {
            setAlertStatus((prev) => ({
              ...prev,
              msg: '設定の更新に失敗しました',
              severity: 'error',
              show: true,
            }))
            if (setError !== undefined) {
              const errBody: { [k: string]: string[] } = err.data.errors
              Object.keys(errBody).forEach((key: string) => {
                const targetKey: any = key
                setError(targetKey, {
                  type: 'invalid',
                  message: errBody[key][0],
                })
              })
            }
          })
      }
    },
    [auth]
  )
  return {
    dailyNotifyValidation,
    // formLoading,
    loading,
    notifyValidation,
    setNotifyValidation,
    setDailyNotifyValidation,
    updateNotifyValidation,
  }
}

export default useNotifyValidation
