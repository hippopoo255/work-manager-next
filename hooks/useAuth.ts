import { useRouter } from 'next/router'
import { useContext, useEffect, useCallback } from 'react'
import { AuthContext } from '@/provider/AuthProvider'
import { authOperation } from '@/globalState/user/operation'
import {
  LoginInputs,
  SignupInputs,
  AccountVerificationInputs,
} from '@/interfaces/form/inputs'
import { encode64 } from '@/lib/util'
import ja from '@/locales/ja'
import en from '@/locales/en'
import { Path, UseFormSetError } from 'react-hook-form'
import { CognitoErrorMessageType } from '@/lib/auth/cognito/cognitoAuth'

const useAuth = <T>(
  canGuest: boolean = false,
  setError?: UseFormSetError<T>
) => {
  const router = useRouter()
  const { auth, dispatch } = useContext(AuthContext)
  const t = router.locale === 'en' ? en : ja

  useEffect(() => {
    let isMounted = true
    const init = async () => {
      console.log('Year')
      authOperation.currentUser(dispatch)
      const res = await authOperation.currentUser(dispatch)
      if (res === '' && !canGuest) {
        router.push('/login')
      }
    }
    init()
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
    await authOperation
      .signup(data)
      .then(() => {
        router.push({
          pathname: '/account_verification',
          query: {
            n: encode64(data.login_id),
          },
        })
      })
      .catch((err) => {
        throw err
      })
  }, [])

  const testLogin = useCallback(async () => {
    await authOperation.testLogin(dispatch).then((testUser) => {
      router.push('/mypage')
    })
  }, [])

  const verifyUser = useCallback(async (data: AccountVerificationInputs) => {
    const onSuccess = (result: any) => {
      alert(
        '検証に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください'
      )
      router.push('/login')
    }
    const onError = (errCode: CognitoErrorMessageType) => {
      if (!!setError) {
        const k = Object.keys(data)[0] as Path<T>
        setError(k, {
          type: 'invalid',
          message:
            t.message.cognitoError[errCode] || t.message.cognitoError.default,
        })
      }
    }
    await authOperation.verifyUser(data, onSuccess, onError)
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
