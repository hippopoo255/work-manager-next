import { AxiosRequestConfig } from 'axios'
import { NextURL } from 'next/dist/server/web/next-url'
import { NextRequest, NextResponse } from 'next/server'
import {
  getCognitoTokenFromCookie,
  refreshCognitoTokenThenSetCookie,
  verifyCognitoToken,
} from '~/libs/auth/cognito/tokenState'
import { CognitoToken } from '~/libs/auth/cognito/types'

// Define paths that don't require authentication
const requireGuestPaths: string[] = ['/signin']
const requiredAuthenticatedPaths: string[] = ['/mypage']

const handleRouteWithoutToken = (url: NextURL, signin: string) => {
  if (requiredAuthenticatedPaths.includes(url.pathname)) {
    return NextResponse.redirect(signin)
  }
  return NextResponse.next()
}

// Middleware that prevents unauthenticated users from accessing protected resources
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const url: NextURL = request.nextUrl.clone()
  const signin = `${url.origin}/signin`
  const mypage = `${url.origin}/mypage`

  const cognitoToken: CognitoToken | null = getCognitoTokenFromCookie(request)
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

  if (tokenVerification && requireGuestPaths.includes(url.pathname)) {
    // 未認証が必須の画面 -> mypageへリダイレクト
    return NextResponse.redirect(mypage)
  } else if (tokenVerification) {
    return NextResponse.next()
  } else {
    let response: NextResponse = NextResponse.next()
    response = await refreshCognitoTokenThenSetCookie(
      cognitoToken.refreshToken,
      request,
      response
    ).catch((error) => {
      console.error('failed to the refresh token', error)
      // idToken検証がエラーだった場合ログイン画面へ
      return NextResponse.redirect(signin)
    })
    return response
  }
}

export const config = {
  matcher: ['/mypage/:path*', '/signin'],
}
