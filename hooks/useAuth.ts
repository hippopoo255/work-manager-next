import { useRouter } from 'next/router'
import { useContext, useCallback, useMemo } from 'react'
import { AuthContext } from '@/provider/AuthProvider'
import { authOperation } from '@/globalState/user/operation'
import {
  LoginInputs,
  SignupInputs,
  AccountVerificationInputs,
} from '@/interfaces/form/inputs'
import { en, ja } from '@/locales'

const useAuth = () => {
  const router = useRouter()
  const { auth, dispatch } = useContext(AuthContext)

  const login = useCallback(async (inputs: LoginInputs) => {
    await authOperation.login(inputs, dispatch).then((loggedInUser) => {
      router.push('/mypage')
    })
  }, [])

  const logout = useCallback(async () => {
    await authOperation.logout(dispatch).then(() => {
      router.push('/login')
    })
  }, [])

  const signup = useCallback(async (inputs: SignupInputs) => {
    await authOperation.signup(inputs)
  }, [])

  const testLogin = useCallback(async () => {
    try {
      if (auth.isLogin) {
        const t = router.locale === 'en' ? en : ja
        throw t.message.testLoginFail
      }
      await authOperation.testLogin(dispatch).then((testUser) => {
        router.push('/mypage')
      })
    } catch (err) {
      throw err
    }
  }, [])

  const verifyUser = useCallback(async (inputs: AccountVerificationInputs) => {
    await authOperation.verifyUser(inputs)
  }, [])

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
    dispatch,
    login,
    logout,
    router,
    signup,
    testLogin,
    verifyUser,
  }
}

export default useAuth
