import { useRouter } from 'next/router'
import { useContext, useEffect, useCallback } from 'react'
import { AuthContext } from '@/provider/AuthProvider'
import { authOperation } from '@/globalState/user/operation'
import {
  LoginInputs,
  SignupInputs,
  AccountVerificationInputs,
} from '@/interfaces/form/inputs'

const useAuth = (canGuest: boolean = false) => {
  const router = useRouter()
  const { auth, dispatch } = useContext(AuthContext)
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const init = async () => {
        const user = await authOperation.currentUser(dispatch)
        if (user === '' && !canGuest) {
          router.push('/login')
        }
        if (user !== '' && router.pathname === '/login') {
          router.push('/')
        }
      }
      init()
    }
    return () => {
      isMounted = false
    }
  }, [])

  const login = async (data: LoginInputs) => {
    await authOperation.login(data, dispatch).then((res) => {
      // router.push('/mypage')
    })
  }

  const logout = useCallback(async () => {
    await authOperation.logout(dispatch).then(() => {
      router.push('/login')
    })
  }, [])

  const signup = useCallback(async (data: SignupInputs) => {
    await authOperation.signup(data)
  }, [])

  const testLogin = useCallback(async () => {
    try {
      if (auth.isLogin) {
        throw '現在のアカウントからログアウトしてください'
      }
      await authOperation.testLogin(dispatch).then((testUser) => {
        // router.push('/mypage')
      })
    } catch (err) {
      throw err
    }
  }, [])

  const verifyUser = useCallback(async (data: AccountVerificationInputs) => {
    await authOperation.verifyUser(data)
  }, [])

  return {
    router,
    auth,
    dispatch,
    login,
    logout,
    signup,
    testLogin,
    verifyUser,
  }
}

export default useAuth
