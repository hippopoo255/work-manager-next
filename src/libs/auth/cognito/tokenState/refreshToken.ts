import { NextRequest, NextResponse } from 'next/server'
import { setTokenIntoCookie } from './cookie'
import { AWS_COGNITO_CLIENT_ID, AWS_COGNITO_URL } from '~/config'
import { TokenType, CognitoRefreshTokenResult } from '~/libs/auth/cognito/types'

const refreshCognitoToken = async (
  refreshToken: string
): Promise<CognitoRefreshTokenResult> => {
  const res = await fetch(`${AWS_COGNITO_URL}/oauth2/token`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/x-www-form-urlencoded',
    }),
    body: Object.entries({
      grant_type: 'refresh_token',
      client_id: AWS_COGNITO_CLIENT_ID,
      refresh_token: refreshToken,
    })
      .map(([k, v]) => `${k}=${v}`)
      .join('&'),
  })
  if (!res.ok) {
    throw new Error(JSON.stringify(await res.json()))
  }
  const newTokens = await res.json()
  return newTokens
}

export const refreshCognitoTokenThenSetCookie = async (
  refreshToken: string,
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> => {
  // RefreshTokenでIdToken/AccessTokenを再生成
  const newTokens: CognitoRefreshTokenResult = await refreshCognitoToken(
    refreshToken
  )
  // IdToken/AccessTokenの有効期限更新成功時次の処理へパス
  // 再生成したIdToken/AccessTokenをCookieにセット
  response = setTokenIntoCookie(
    request,
    response,
    TokenType.IdToken,
    newTokens.id_token
  )
  response = setTokenIntoCookie(
    request,
    response,
    TokenType.AccessToken,
    newTokens.access_token
  )
  return response
}
