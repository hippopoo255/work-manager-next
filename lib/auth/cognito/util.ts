import { LoginInputs } from '@/interfaces/form/inputs'
import { ja, en } from '@/locales'
import router from 'next/router'
import { Path } from 'react-hook-form'

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

export const handleError = <T = LoginInputs>(
  error: any,
  logPrefix: string = 'sign in failed'
) => {
  console.error(`${logPrefix}:`, error)
  if (error.code !== undefined) {
    const errCode = error.code as CognitoErrorMessageType
    const { key, message } = getErrorBody<T>(errCode)
    throw { key, message }
  }
  throw error
}

const getErrorBody = <T = LoginInputs>(errCode: CognitoErrorMessageType) => {
  const key = 'password' as Path<T>
  const t = router.locale === 'en' ? en : ja
  const message =
    t.message.cognitoError[errCode] || t.message.cognitoError.default
  return { key, message }
}
