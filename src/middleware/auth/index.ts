import { NextURL } from 'next/dist/server/web/next-url'
import { NextRequest, NextResponse } from 'next/server'
import { setRefreshedCognitoTokenToCookie } from './refreshToken'
import {
  requireGuestPaths,
  requiredUnOrganizedPaths,
  API_STAGE_URL,
} from '~/config'
import {
  verifyCognitoToken,
  refreshCognitoToken,
} from '~/libs/cognito/handleCognitoToken'
import { CognitoToken, CognitoRefreshTokenResult } from '~/libs/cognito/types'
import {
  getCognitoTokenFromCookie,
  isRequiredAuthenticatedPaths,
  isRequiredUnOrganizedPaths,
} from '~/utils'

const handleRouteWithoutToken = (url: NextURL, signin: string) => {
  if (isRequiredAuthenticatedPaths(url.pathname)) {
    return NextResponse.redirect(signin)
  }
  return NextResponse.next()
}

// Middleware that prevents unauthenticated users from accessing protected resources
export async function authMiddleware(
  request: NextRequest
): Promise<NextResponse> {
  const url: NextURL = request.nextUrl.clone()
  const signin = `${url.origin}/signin`
  const mypage = `${url.origin}/mypage`
  const orgRegister = `${url.origin}/mypage/organization/register`

  let cognitoToken: CognitoToken | null = getCognitoTokenFromCookie(request)
  // Cookieからtokenが取得できない
  if (!cognitoToken) {
    // 認証が必須の画面 -> signinへリダイレクト
    // 認証が任意の画面 -> そのまま進む
    return handleRouteWithoutToken(url, signin)
  }

  // Verify the ID token
  const tokenVerification = await verifyCognitoToken(cognitoToken.idToken)
    .then(() => {
      return true
    })
    .catch((error) => {
      console.error('ID Token is not valid', error)
      return false
    })

  let response: NextResponse = NextResponse.next()

  if (!tokenVerification) {
    const newTokens: CognitoRefreshTokenResult | null =
      await refreshCognitoToken(cognitoToken.refreshToken).catch((error) => {
        console.error('failed to the refresh token', error)
        return null
      })

    // トークンリフレッシュに失敗したら、サインインからやり直し
    if (newTokens === null) {
      return NextResponse.redirect(signin)
    }

    response = await setRefreshedCognitoTokenToCookie(
      newTokens,
      request,
      response
    )

    cognitoToken = {
      ...cognitoToken,
      idToken: newTokens.id_token,
      accessToken: newTokens.access_token,
    }
  }

  if (requireGuestPaths.includes(url.pathname)) {
    // 未認証が必須の画面 -> mypageへリダイレクト
    return NextResponse.redirect(mypage)
  }

  const user = await fetch(`${API_STAGE_URL}/user/current`, {
    headers: { Authorization: cognitoToken.accessToken },
  }).then((res) => res.json())

  if (!(isRequiredUnOrganizedPaths(url.pathname) || user.organization_id)) {
    return NextResponse.redirect(orgRegister)
  } else if (isRequiredUnOrganizedPaths(url.pathname) && user.organization_id) {
    return NextResponse.redirect(mypage)
  } else {
    return response
  }
}
