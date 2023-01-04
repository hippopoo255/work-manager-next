import { ISignUpResult, CognitoUserSession } from 'amazon-cognito-identity-js'
import { Auth } from 'aws-amplify'
import { AxiosRequestConfig } from 'axios'

import { handleError } from './handleError'
import { amplifyConfigure } from './init'
import { uri } from '~/config'
import { COGNITO_TEST_USER } from '~/config/auth'
import { fetch } from '~/libs/http_clients/axios'

import {
  User,
  AccountVerificationInputs,
  ForgotPasswordInputs,
  SignInInputs,
  PasswordResetInputs,
  SignUpInputs,
  ForgotPasswordResetInputs,
} from '~/schema/generated/@types'
import { encode64, decode64 } from '~/utils'

amplifyConfigure()

const getJwt = async (authWithSSR: any = undefined): Promise<string> => {
  const cognitoSession: '' | CognitoUserSession =
    await Auth.currentSession().catch((err: any) => {
      return ''
    })
  if (cognitoSession) {
    return cognitoSession.getIdToken().getJwtToken()
  }
  return cognitoSession
}

const currentUser = async (currentAuthorPath: string = uri.auth.user) => {
  const jwt = await getJwt()
  if (!jwt) {
    return null
  }

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: jwt || '',
    },
  }

  const { data: user } = await fetch<User | null>(currentAuthorPath, config)
  return !user
    ? null
    : {
        ...user,
        jwt,
      }
}

const sendPasswordForgotten = async ({ user_id }: ForgotPasswordInputs) => {
  const response = await Auth.forgotPassword(user_id).catch((error) => {
    handleError<ForgotPasswordInputs>(error, 'reset password error')
    return null
  })
  return encode64(user_id)
}

const resetPassword = async ({
  user_id,
  verification_code,
  password,
}: ForgotPasswordResetInputs) => {
  const username = decode64(user_id)
  const result = await Auth.forgotPasswordSubmit(
    username,
    verification_code,
    password
  ).catch((error) => {
    handleError<ForgotPasswordResetInputs>(error, 'reset password error')
  })
}

const changePassword = async ({
  old_password,
  password,
}: PasswordResetInputs) => {
  const response = await Auth.currentAuthenticatedUser()
    .then((user) => {
      return Auth.changePassword(user, old_password, password)
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      handleError<PasswordResetInputs>(
        error,
        'incorrect password',
        'change_password.old_password'
      )
      return {}
    })
  return response
}

const signIn = async ({ user_id, password }: SignInInputs) => {
  const cognitoUser = await Auth.signIn(user_id, password).catch((error) => {
    handleError<SignInInputs>(error)
  })
  if (!!cognitoUser) {
    return (await currentUser()) as User | null
  }

  return null
}

const signOut = async () => {
  return await Auth.signOut()
    .catch((error) => {
      handleError(error, 'signOut failed')
    })
    .finally(() => null)
  // console.log('signOut succeeded')
}

const signUp = async ({
  email,
  user_id,
  password,
  address,
  family_name,
  family_name_kana,
  given_name,
  given_name_kana,
}: SignUpInputs) => {
  try {
    const { user }: ISignUpResult = await Auth.signUp({
      username: user_id,
      password,
      attributes: {
        email, // optional
        address: address || '', // optional - E.164 number convention
        given_name: given_name,
        family_name: family_name,
        // other custom attributes
        'custom:login_id': user_id,
        'custom:given_name_kana': given_name_kana,
        'custom:family_name_kana': family_name_kana,
        // 'custom:role_id': '2',
        // 'custom:department_code': '5',
      },
    })
    return encode64(user_id)
  } catch (error) {
    console.log('ERR:', error)
    handleError<SignUpInputs>(error, 'sign up failed')
  }
}

const testSignIn = async () => {
  const data = {
    user_id: COGNITO_TEST_USER.name,
    password: COGNITO_TEST_USER.password,
  }
  return await signIn(data)
}

const verifyUser = async ({
  user_id,
  verification_code,
}: AccountVerificationInputs) => {
  await Auth.confirmSignUp(decode64(user_id), verification_code).catch(
    (error) => {
      handleError<AccountVerificationInputs>(error, 'confirmation error')
    }
  )
}

const cognitoUser = {
  changePassword,
  currentUser,
  getJwt,
  resetPassword,
  sendPasswordForgotten,
  signIn,
  signOut,
  signUp,
  testSignIn,
  verifyUser,
}

export default cognitoUser
