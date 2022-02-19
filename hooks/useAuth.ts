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
import { User } from '@/interfaces/models'

const useAuth = () => {
  const router = useRouter()
  const { auth, dispatch } = useContext(AuthContext)

  const pushToOrgCreateOrMyPage = (hasOrgData: boolean = true) => {
    const path = hasOrgData ? '/mypage' : '/organization/create'
    router.push(path)
  }

  const login = useCallback(async (inputs: LoginInputs) => {
    await authOperation
      .login(inputs, dispatch)
      .then((loggedInUser: User | '') => {
        if (loggedInUser) {
          pushToOrgCreateOrMyPage(loggedInUser.is_initialized)
        }
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
        if (testUser) {
          pushToOrgCreateOrMyPage(testUser.is_initialized)
        }
      })
    } catch (err) {
      throw err
    }
  }, [auth])

  const verifyUser = useCallback(async (inputs: AccountVerificationInputs) => {
    await authOperation.verifyUser(inputs)
  }, [])

  const duplicateEmailCount = useCallback(
    async (email: SignupInputs['email']) => {
      return await authOperation.duplicateEmailCount(email)
    },
    []
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
    duplicateEmailCount,
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
