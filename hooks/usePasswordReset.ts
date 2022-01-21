import { useRouter } from 'next/router'
import { useContext, useCallback, useMemo } from 'react'
import { AuthContext } from '@/provider/AuthProvider'
import { authOperation } from '@/globalState/user/operation'
import {
  ForgotPasswordInputs,
  ForgotPasswordResetInputs,
  PasswordResetInputs,
} from '@/interfaces/form/inputs'
import { cognitoAuth } from '@/lib/auth'

const usePasswordReset = () => {
  const router = useRouter()
  const { auth, dispatch } = useContext(AuthContext)

  const forgotPassword = useCallback(
    async (inputs: ForgotPasswordInputs) =>
      await cognitoAuth.forgotPassword(inputs),
    []
  )

  const logout = useCallback(async () => {
    await authOperation.logout(dispatch).then(() => {
      router.push('/login')
    })
  }, [])

  const resetForgottenPassword = useCallback(
    async (inputs: ForgotPasswordResetInputs) =>
      await cognitoAuth.resetForgottenPassword(inputs),
    []
  )

  const resetPassword = useCallback(
    async (inputs: PasswordResetInputs) => {
      return await cognitoAuth.resetPassword(inputs).then((response) => {
        setTimeout(() => {
          logout()
        }, 4000)
        return response
      })
    },
    [auth]
  )

  const config = useMemo(() => {
    return {
      headers: {
        Authorization: auth.user.jwt || '',
      },
    }
  }, [auth])

  return {
    auth,
    config,
    forgotPassword,
    logout,
    resetForgottenPassword,
    resetPassword,
    router,
  }
}

export default usePasswordReset
