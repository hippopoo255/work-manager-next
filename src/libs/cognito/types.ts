import { IncomingMessage } from 'http'
export const TokenType = {
  IdToken: 'idToken',
  AccessToken: 'accessToken',
  RefreshToken: 'refreshToken',
} as const

export type TokenType = typeof TokenType[keyof typeof TokenType]

export type CognitoToken = {
  idToken: string
  accessToken: string
  refreshToken: string
}

export type CognitoRefreshTokenResult = {
  id_token: string
  access_token: string
  token_type: string
  expires_in: number
}

export type Req = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string
  }>
}

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
