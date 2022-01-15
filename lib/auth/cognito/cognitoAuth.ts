import userPool from './userPool'
import { handleError } from './util'
import { cognitoTestUser, amplifyConfigure } from './config'
import { Auth } from 'aws-amplify'
amplifyConfigure()

import {
  CognitoUser,
  ISignUpResult,
  CognitoUserSession,
} from 'amazon-cognito-identity-js'

import router from 'next/router'
import { encode64 } from '@/lib/util'

import {
  LoginInputs,
  SignupInputs,
  AccountVerificationInputs,
} from '@/interfaces/form/inputs'
import { User } from '@/interfaces/models'

const currentUser = async () => {
  const userInfo: '' | CognitoUserSession = await Auth.currentSession().catch(
    (err) => {
      console.log('current user err:', err)
      return ''
    }
  )
  if (!!userInfo) {
    console.log('current user:', userInfo)
    const user = userInfo.getIdToken().payload
    user.family_name = user['cognito:username']
    return user
  }
  return userInfo
}

const signin = async ({ login_id, password }: LoginInputs) => {
  const cognitoUser = await Auth.signIn(login_id, password).catch((error) => {
    handleError<LoginInputs>(error)
  })
  console.log('signin succeeded:', cognitoUser)
  const user = cognitoUser.attributes
  user.family_name = cognitoUser.username
  return user as User
}

const signout = async () => {
  const res = await Auth.signOut().catch((error) => {
    handleError(error, 'logout failed')
  })
  console.log('logout success:', res)
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
        'custom:login_id': login_id,
        // other custom attributes
      },
    })
    console.log('signup succeeded:', user)
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
    console.log('confirmation success:', result)
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
