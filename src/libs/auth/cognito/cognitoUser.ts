import { ISignUpResult, CognitoUserSession } from 'amazon-cognito-identity-js'
import { Auth } from 'aws-amplify'
import { AxiosRequestConfig } from 'axios'
import router from 'next/router'

import { amplifyConfigure } from './amplifyConfigure'
import { handleError } from './util'
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
} from '~/schema/@types'
import { encode64, decode64 } from '~/utils'

amplifyConfigure()

const getJwt = async (authWithSSR: any = undefined): Promise<string> => {
  const authClass = authWithSSR ?? Auth
  const cognitoSession: '' | CognitoUserSession = await authClass
    .currentSession()
    .catch((err: any) => {
      return ''
    })
  if (cognitoSession) {
    return cognitoSession.getIdToken().getJwtToken()
  }
  return cognitoSession
}

const currentUser = async (
  authWithSSR: any = undefined,
  currentAuthorPath: string = '/user/current'
) => {
  const jwt = await getJwt(authWithSSR)
  if (!jwt) {
    return ''
  }

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: jwt || '',
    },
  }

  const data = await fetch<User | null>(currentAuthorPath, config)
    .then(({ data }) => data)
    .catch((err) => console.log('err:', err))

  const user = !data
    ? ''
    : {
        ...data,
        jwt,
      }

  return user
}

const forgotPassword = async ({ user_id }: ForgotPasswordInputs) => {
  const response = await Auth.forgotPassword(user_id).catch((error) => {
    handleError<ForgotPasswordInputs>(error, 'reset password error')
    return {}
  })

  if (!!response) {
    setTimeout(() => {
      router.push({
        pathname: '/password/reset',
        query: {
          n: encode64(user_id),
        },
      })
    }, 4000)
  }
  return {
    message:
      'ご登録いただいているメールアドレスに検証用コードを送信しました。\n数秒後に画面が切り替わりますので、検証コードと新しいパスワードを入力してください。',
    data: 'SENDED',
  }
}

const resetForgottenPassword = async ({
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
  if (result === 'SUCCESS') {
    // console.log('confirmation success:', result)
    alert(
      '再設定に成功しました。数秒後ログイン画面に移動しますので、ログインをお試しください'
    )
    router.push('/login')
  }
}

const resetPassword = async ({
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
    return (await currentUser()) as User | ''
  }

  return ''
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
    // console.log('signUp succeeded')
    router.push({
      pathname: '/account_verification',
      query: {
        n: encode64(user_id),
      },
    })
    return user
  } catch (error) {
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
  const result = await Auth.confirmSignUp(user_id, verification_code).catch(
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

const cognitoUser = {
  currentUser,
  forgotPassword,
  getJwt,
  resetForgottenPassword,
  resetPassword,
  signIn,
  signOut,
  signUp,
  testSignIn,
  verifyUser,
}

export default cognitoUser
