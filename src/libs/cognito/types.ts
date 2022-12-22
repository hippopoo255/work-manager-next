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
