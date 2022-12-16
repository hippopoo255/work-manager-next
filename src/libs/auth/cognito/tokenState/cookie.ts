import { RequestCookie } from 'next/dist/server/web/spec-extension/cookies'
import { NextRequest, NextResponse } from 'next/server'
import { AWS_COGNITO_CLIENT_ID } from '~/config'
import { TokenType, CognitoToken } from '~/libs/auth/cognito/types'

export const setTokenIntoCookie = (
  request: NextRequest,
  response: NextResponse,
  tokenType: TokenType,
  tokenValue: string
): NextResponse => {
  const cookie: RequestCookie | null = getCookieByCognitoTokenType(
    request,
    tokenType
  )

  if (!cookie) {
    throw Error(`${tokenType} is not found in the request cooke`)
  }

  response.cookies.set({
    name: cookie.name,
    value: tokenValue,
    secure: true,
    httpOnly: true,
  })

  return response
}

export const getCognitoTokenFromCookie = (
  request: NextRequest
): CognitoToken | null => {
  const idToken = getCognitoTokenFromCookieByTokenType(
    request,
    TokenType.IdToken
  )
  const accessToken = getCognitoTokenFromCookieByTokenType(
    request,
    TokenType.AccessToken
  )
  const refreshToken = getCognitoTokenFromCookieByTokenType(
    request,
    TokenType.RefreshToken
  )
  return idToken && accessToken && refreshToken
    ? { idToken, accessToken, refreshToken }
    : null
}

const getCognitoTokenFromCookieByTokenType = (
  request: NextRequest,
  tokenType: TokenType
): string | null => {
  const cookie = getCookieByCognitoTokenType(request, tokenType)
  return cookie && cookie.value
}

const getCookieByCognitoTokenType = (
  request: NextRequest,
  tokenType: TokenType
): RequestCookie | null => {
  /* 認証済の場合、Cookieには以下ID Tokenがセットされているので正規表現で取得
    { name: 'CognitoIdentityServiceProvider.{COGNITO_USER_POOLS_WEB_CLIENT_ID}.11779beb-ece4-4fd5-a972-542861a0c1c0.idToken',
      value: 'eyJraWQiOiJZem5hMXdZRjF2TFN5SlZIN09wXC9mQlE3R0wxUTAwZGNRaGpIRlpDR1FTZz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiO...' }
  */
  const regexp = new RegExp(
    `CognitoIdentityServiceProvider\\.${AWS_COGNITO_CLIENT_ID}\\..+\\.${tokenType}`
  )
  // Cookieに保存されたCognitoの Token(JWT) を取得
  // Amplify.configure({ ...awsExports, ssr: true }); で ssr: true を設定している為JWTの保存先がCookieとなる
  const cookies = request.cookies
    .getAll()
    .filter((cookie: RequestCookie) => regexp.test(cookie.name))
  return cookies.length === 1 ? cookies[0] : null
}
