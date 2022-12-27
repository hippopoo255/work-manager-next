'use client'

import { cognitoAdmin } from '~/libs/cognito/auth'
import { SignUpInputs } from '~/schema/generated/@types'
import { useStatus } from '~/services/status'

const useRegisterAdmin = () => {
  const { update: updateStatus } = useStatus()

  const register = async (inputs: SignUpInputs) => {
    const admin = await cognitoAdmin.signUp(inputs).catch((err) => {
      updateStatus({
        statusCode: 400,
        message: '管理システム用のアカウント登録に失敗しました',
        category: 'error',
      })

      return null
    })

    return admin
  }

  return {
    register,
  }
}

export default useRegisterAdmin
