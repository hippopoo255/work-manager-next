// import router from 'next/navigation'
import { Path } from 'react-hook-form'
import { amplifyConfigure } from './init'
import { ja, en } from '~/config/locales'
import { SignInInputs } from '~/schema/generated/@types'

amplifyConfigure()

export type CognitoErrorMessageType =
  // username が Cognito ユーザープールに存在しない
  | 'UserNotFoundException'
  // 認証に失敗した
  // 既にステータスが CONFIRMED
  // パスワードを間違い続けた場合
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
  // 検証が完了しているアカウントについて再度検証リクエストがあった
  | 'ExpiredCodeException'
  | 'default'

const errorKeys = {
  UserNotFoundException: 'login_id',
  NotAuthorizedException: 'login_id',
  UserNotConfirmedException: 'login_id',
  UsernameExistsException: 'login_id',
  CodeMismatchException: 'verification_code',
  InvalidParameterException: 'password',
  InvalidPasswordException: 'password',
  LimitExceededException: 'password',
  ExpiredCodeException: 'login_id',
  default: 'login_id',
}

export const handleError = <T = SignInInputs>(
  error: any,
  logPrefix: string = 'sign in failed',
  specifiedKey?: string
) => {
  if (error.code !== undefined) {
    const errCode = error.code as CognitoErrorMessageType
    const { key, message } = getErrorBody<T>(errCode, specifiedKey)
    console.log(`key:${key}`)
    throw { key, message }
  }
  throw error
}

const getErrorBody = <T = Path<SignInInputs>>(
  errCode: CognitoErrorMessageType,
  specifiedKey?: string
) => {
  const key = specifiedKey || errorKeys[errCode]
  // const t = router.locale === 'en' ? en : ja
  const t = ja
  const message =
    t.message.cognitoError[errCode] || t.message.cognitoError.default
  return { key, message }
}
