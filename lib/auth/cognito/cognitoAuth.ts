import userPool from './userPool'
import { cognitoTestUser } from './config'

import {
  CognitoUser,
  CognitoUserAttribute,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'

import {
  LoginInputs,
  SignupInputs,
  AccountVerificationInputs,
} from '@/interfaces/form/inputs'

export type CognitoErrorMessageType =
  // username が Cognito ユーザープールに存在しない
  | 'UserNotFoundException'
  // 認証に失敗した
  // 既にステータスが CONFIRMED
  // パスワードを間違え続けた場合
  | 'NotAuthorizedException'
  // ユーザのステータスがUNCONFIRMED
  | 'UserNotConfirmedException'
  // ユーザープール内に既に同じ username が存在する
  | 'UsernameExistsException'
  // 無効なコードが入力された
  | 'CodeMismatchException'
  // 必要な属性が足りない場合 or
  // 入力された各項目が Cognito 側で正しくパースできない場合（バリデーションエラー） or
  // passwordが6文字未満の場合
  | 'InvalidParameterException'
  // ユーザープールのポリシーで設定したパスワードの強度を満たさない
  | 'InvalidPasswordException'
  // パスワード試行回数を超えた
  | 'LimitExceededException'
  // 検証が完了しているアカウントについてサイド検証リクエストがあった
  | 'ExpiredCodeException'
  | 'default'

const currentUser = () => {
  const cognitoUser: CognitoUser | null = userPool.getCurrentUser()
  console.log('cognitoUser:', cognitoUser)
  if (cognitoUser) {
    cognitoUser.getSession((err, session) => {
      if (err) {
        console.log('sessionError:', err)
      } else {
        console.log('session:', session)
        cognitoUser.getUserAttributes((err, result) => {
          if (err) {
            console.log('err:', err)
            return
          }
          console.log('getUserAttributes:', result)
        })
      }
    })
  }
}

const signin = ({ login_id, password }: LoginInputs) => {
  const authenticationDetails = new AuthenticationDetails({
    Username: login_id,
    Password: password,
  })

  const cognitoUser = new CognitoUser({
    Username: login_id,
    Pool: userPool,
  })

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('result:', result)
      const accessToken = result.getAccessToken().getJwtToken()
      console.log('AccessToken: ' + accessToken)
      // setlogin_id('')
      // setPassword('')
    },
    onFailure: (err) => {
      console.error(err)
    },
  })
}

const signout = () => {
  const cognitoUser: CognitoUser | null = userPool.getCurrentUser()
  console.log(cognitoUser)
  if (cognitoUser) {
    cognitoUser.signOut()
    console.log('signed out')
  } else {
    console.log('no user signing in')
  }
  localStorage.clear()
}

const signup = ({ email, login_id, password, address }: SignupInputs) => {
  const attributeList = [
    new CognitoUserAttribute({
      Name: 'name',
      Value: login_id,
    }),
    new CognitoUserAttribute({
      Name: 'email',
      Value: email,
    }),
    new CognitoUserAttribute({
      Name: 'custom:login_id',
      Value: address,
    }),
  ]
  try {
    userPool.signUp(login_id, password, attributeList, [], (err, result) => {
      if (err) {
        throw err
      }
      console.log(result)
    })
  } catch (err) {
    console.log('テスト')
    throw err
  }
}

const testSignin = async () => {
  const data = {
    login_id: cognitoTestUser.name,
    password: cognitoTestUser.password,
  }
  await signin(data)
}

const verifyUser = (
  { login_id, verification_code }: AccountVerificationInputs,
  onSuccess: (result: any) => void,
  onError: (errCode: CognitoErrorMessageType) => void
) => {
  const cognitoUser = new CognitoUser({
    Username: login_id,
    Pool: userPool,
  })
  cognitoUser.confirmRegistration(
    verification_code,
    true,
    (err: any, result: any) => {
      if (err) {
        console.error('error!:', err)
        onError(err.code as CognitoErrorMessageType)
        return
      }
      console.log('verification result:', result)
      console.log('verification succeeded')
      onSuccess(result)
    }
  )
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
