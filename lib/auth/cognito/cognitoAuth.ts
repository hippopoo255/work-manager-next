// import userPool from './userPool'
import { handleError } from './util'
import { cognitoTestUser, amplifyConfigure } from './config'
import { Auth } from 'aws-amplify'
amplifyConfigure()

import { ISignUpResult, CognitoUserSession } from 'amazon-cognito-identity-js'
import { requestUri, getRequest } from '@/api'
import router from 'next/router'
import { encode64 } from '@/lib/util'

import {
  LoginInputs,
  SignupInputs,
  AccountVerificationInputs,
} from '@/interfaces/form/inputs'
import { User } from '@/interfaces/models'
import { AxiosRequestConfig } from 'axios'

const currentUser = async (
  currentAuthorPath: string = requestUri.currentUser
) => {
  const authResult: '' | CognitoUserSession = await Auth.currentSession().catch(
    (err) => {
      console.log('current user err:', err)
      return ''
    }
  )
  if (!!authResult) {
    const result = authResult.getIdToken()
    const jwt = result.getJwtToken()
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: jwt || '',
      },
    }
    const user = await getRequest<User | ''>(
      currentAuthorPath,
      undefined,
      config
    ).then((u) => {
      if (!!u) {
        return {
          ...u,
          jwt,
        }
      }
      return ''
    })
    return user
  }
  return authResult // ''
}

const signin = async ({ login_id, password }: LoginInputs) => {
  const cognitoUser = await Auth.signIn(login_id, password).catch((error) => {
    handleError<LoginInputs>(error)
  })

  if (!!cognitoUser) {
    return (await currentUser()) as User
  }

  return ''
}

const signout = async () => {
  const res = await Auth.signOut().catch((error) => {
    handleError(error, 'logout failed')
  })
  // console.log('logout success:', res)
  return null
}

const signup = async ({ email, login_id, password, address }: SignupInputs) => {
  try {
    const { user }: ISignUpResult = await Auth.signUp({
      username: login_id,
      password,
      attributes: {
        email, // optional
        address, // optional - E.164 number convention
        // given_name: '太郎',
        // family_name: 'テスト',
        // other custom attributes
        'custom:login_id': login_id,
        // 'custom:given_name_kana': '太郎',
        // 'custom:family_name_kana': 'テスト',
        // 'custom:role_id': '2',
        // 'custom:department_code': '5',
      },
    })
    // console.log('signup succeeded:', user)
    router.push({
      pathname: '/account_verification',
      query: {
        n: encode64(login_id),
      },
    })
    return user
  } catch (error) {
    handleError<SignupInputs>(error, 'sign up failed')
  }
}

const testSignin = async () => {
  const data = {
    login_id: cognitoTestUser.name,
    password: cognitoTestUser.password,
  }
  return await signin(data)
}

const verifyUser = async ({
  login_id,
  verification_code,
}: AccountVerificationInputs) => {
  const result = await Auth.confirmSignUp(login_id, verification_code).catch(
    (error) => {
      handleError<AccountVerificationInputs>(error, 'confirmation error')
    }
  )
  if (result === 'SUCCESS') {
    // console.log('confirmation success:', result)
    alert(
      '検証に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください'
    )
    router.push('/login')
  }
}

const cognitoAuth = {
  currentUser,
  signin,
  signout,
  signup,
  testSignin,
  verifyUser,
}

export default cognitoAuth
