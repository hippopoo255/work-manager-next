// import userPool from './userPool'
import { handleError } from './util'
import { cognitoTestUser, amplifyConfigure } from './config'
import { Auth } from 'aws-amplify'
amplifyConfigure()

import { ISignUpResult, CognitoUserSession } from 'amazon-cognito-identity-js'
import { requestUri, getRequest } from '@/api'
import router from 'next/router'
import { encode64, decode64 } from '@/lib/util'

import {
  AccountVerificationInputs,
  ForgotPasswordInputs,
  LoginInputs,
  PasswordResetInputs,
  SignupInputs,
  ForgotPasswordResetInputs,
} from '@/interfaces/form/inputs'
import { User } from '@/interfaces/models'
import { AxiosRequestConfig } from 'axios'

const currentUser = async (
  currentAuthorPath: string = requestUri.currentUser
) => {
  const authResult: '' | CognitoUserSession = await Auth.currentSession().catch(
    (err) => {
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
    )
      .then((u) => {
        if (!!u) {
          return {
            ...u,
            jwt,
          } as User
        }
        return ''
      })
      .catch((err) => {
        let message: string = !!err.data.message
          ? err.data.message
          : 'ネットワークまたはサーバエラーです。'
        if (message.match(/Duplicate entry/)) {
          message = 'このメールアドレスは既に登録されています'
        } else {
          message = 'ネットワークまたはサーバエラーです。'
        }
        throw {
          key: 'login_id',
          message,
        }
      })
    return user
  }
  return authResult // ''
}

const forgotPassword = async ({ login_id }: ForgotPasswordInputs) => {
  const response = await Auth.forgotPassword(login_id).catch((error) => {
    handleError<ForgotPasswordInputs>(error, 'reset password error')
    return {}
  })

  if (!!response) {
    setTimeout(() => {
      router.push({
        pathname: '/password/reset',
        query: {
          n: encode64(login_id),
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
  login_id,
  verification_code,
  password,
}: ForgotPasswordResetInputs) => {
  const username = decode64(login_id)
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
  // console.log(response)
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
  // console.log('logout succeeded')
  return null
}

const signup = async ({
  email,
  login_id,
  password,
  address,
  family_name,
  family_name_kana,
  given_name,
  given_name_kana,
}: SignupInputs) => {
  try {
    const { user }: ISignUpResult = await Auth.signUp({
      username: login_id,
      password,
      attributes: {
        email, // optional
        address: address || '', // optional - E.164 number convention
        given_name: given_name,
        family_name: family_name,
        // other custom attributes
        'custom:login_id': login_id,
        'custom:given_name_kana': given_name_kana,
        'custom:family_name_kana': family_name_kana,
        // 'custom:role_id': '2',
        // 'custom:department_code': '5',
      },
    })
    // console.log('signup succeeded')
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
  forgotPassword,
  resetForgottenPassword,
  resetPassword,
  signin,
  signout,
  signup,
  testSignin,
  verifyUser,
}

export default cognitoAuth
