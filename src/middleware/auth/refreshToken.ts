import { NextRequest, NextResponse } from 'next/server'
import { refreshCognitoToken } from '~/libs/cognito/handleCognitoToken'
import { TokenType, CognitoRefreshTokenResult } from '~/libs/cognito/types'
import { setTokenIntoCookie } from '~/utils'

export const setRefreshedCognitoTokenToCookie = async (
  newTokens: CognitoRefreshTokenResult,
  request: NextRequest,
  response: NextResponse
): Promise<NextResponse> => {
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
