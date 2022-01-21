import React, { useCallback } from 'react'
import { usePasswordReset } from '@/hooks'
import { SettingInputs } from '@/interfaces/form/inputs'
import { UseFormSetError } from 'react-hook-form'
import { AlertStatus } from '@/interfaces/common'

type Props = {
  setError: UseFormSetError<SettingInputs>
  setAlertStatus: React.Dispatch<React.SetStateAction<AlertStatus>>
}

const useChangePassword = ({ setError, setAlertStatus }: Props) => {
  const { auth, resetPassword, logout } = usePasswordReset()
  const changePassword = useCallback(
    async (inputs: SettingInputs['change_password']) => {
      if (auth.isLogin) {
        await resetPassword(inputs)
          .then((response) => {
            if (response === 'SUCCESS') {
              setAlertStatus((prev) => ({
                ...prev,
                msg: 'パスワードを変更しました。一旦ログアウトしますので再度ログインしてください。',
                severity: 'success',
                show: true,
              }))
            }
          })
          .catch(({ key, message }) => {
            const replaced = message.split('ユーザー名または')
            setError(key, {
              type: 'invalid',
              message: replaced[replaced.length - 1],
            })
          })
      }
    },
    [auth]
  )
  return {
    changePassword,
  }
}

export default useChangePassword
