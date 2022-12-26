import { RequestCookie } from 'next/dist/server/web/spec-extension/cookies'
import { NextRequest, NextResponse } from 'next/server'
import { AWS_COGNITO_CLIENT_ID } from '~/config'
import { TokenType, CognitoToken, Req } from '~/libs/cognito/types'

export const setTokenIntoCookie = (
  request: NextRequest,
  response: NextResponse,
  tokenType: TokenType,
  tokenValue: string
): NextResponse => {
  const cookies = getCookiesFromRequest(request)
  const cookie: RequestCookie | null = getCookieByTokenType(cookies, tokenType)

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

/**
 * middlewareから呼び出す
 * @param request
 * @returns
 */
export const getCognitoTokenFromCookie = (
  request: NextRequest
): CognitoToken | null => {
  const cookies = getCookiesFromRequest(request)
  const idToken = getCognitoTokenFromCookiesByTokenType(
    cookies,
    TokenType.IdToken
  )
  const accessToken = getCognitoTokenFromCookiesByTokenType(
    cookies,
    TokenType.AccessToken
  )
  const refreshToken = getCognitoTokenFromCookiesByTokenType(
    cookies,
    TokenType.RefreshToken
  )
  return idToken && accessToken && refreshToken
    ? { idToken, accessToken, refreshToken }
    : null
}

/**
 * getServerSidePropsから呼び出す
 * @param request
 * @returns
 */
export const getCognitoTokenFromNextApiRequest = (
  request: Req
): CognitoToken | null => {
  const cookies = makeCookiesFromNextApiRequest(request)
  const idToken = getCognitoTokenFromCookiesByTokenType(
    cookies,
    TokenType.IdToken
  )
  const accessToken = getCognitoTokenFromCookiesByTokenType(
    cookies,
    TokenType.AccessToken
  )
  const refreshToken = getCognitoTokenFromCookiesByTokenType(
    cookies,
    TokenType.RefreshToken
  )
  return idToken && accessToken && refreshToken
    ? { idToken, accessToken, refreshToken }
    : null
}

/**
 * next/headers#cookies()から呼び出す
 * @returns
 */
export const getCognitoTokenFromNextHeader = (
  cookies: RequestCookie[]
): CognitoToken | null => {
  const idToken = getCognitoTokenFromCookiesByTokenType(
    cookies,
    TokenType.IdToken
  )
  const accessToken = getCognitoTokenFromCookiesByTokenType(
    cookies,
    TokenType.AccessToken
  )
  const refreshToken = getCognitoTokenFromCookiesByTokenType(
    cookies,
    TokenType.RefreshToken
  )
  return idToken && accessToken && refreshToken
    ? { idToken, accessToken, refreshToken }
    : null
}

/**
 * client componentから呼び出す
 * @returns
 */
export const getCognitoTokenFromClient = (): CognitoToken | null => {
  const cookies = getCookiesFromDocument()
  const idToken = getCognitoTokenFromCookiesByTokenType(
    cookies,
    TokenType.IdToken
  )
  const accessToken = getCognitoTokenFromCookiesByTokenType(
    cookies,
    TokenType.AccessToken
  )
  const refreshToken = getCognitoTokenFromCookiesByTokenType(
    cookies,
    TokenType.RefreshToken
  )
  return idToken && accessToken && refreshToken
    ? { idToken, accessToken, refreshToken }
    : null
}

/**
 * client componentから呼び出す
 * @returns
 */
export const getCookieValueFromDocumentByName = (
  key: string
): string | null => {
  const cookies = getCookiesFromDocument()
  const regexp = new RegExp(`${key}`)
  // Cookieに保存されたCognitoの Token(JWT) を取得
  // Amplify.configure({ ...awsExports, ssr: true }); で ssr: true を設定している為JWTの保存先がCookieとなる
  const target = cookies.find((cookie: Partial<RequestCookie>) =>
    regexp.test(cookie.name ?? '')
  )
  return target?.value ?? null
}

/*----------------------- */
// リクエスト(NextRequest | Req)からCookieを取得する{name: string; value?: string}[]
// 1.getCookiesFromRequest
// 2.makeCookiesFromNextApiRequest
// 3.getCookiesFromDocument
/*----------------------- */
const getCookiesFromRequest = (request: NextRequest): RequestCookie[] =>
  request.cookies.getAll()

const makeCookiesFromNextApiRequest = (
  request: Req
): Partial<RequestCookie>[] => {
  const cookies = request.cookies
  return Object.keys(cookies).map((name) => ({
    name,
    value: cookies[name],
  }))
}

const getCookiesFromDocument = (): Partial<RequestCookie>[] => {
  const text = document.cookie
  const arr = text.split(';')
  return arr.map((nameValue) => {
    const [name, value] = nameValue.split('=')
    return {
      name,
      value,
    }
  })
}

/**
 * 抽出した目当てのCookie{name: string; value: string} からvalue(string)を取り出す
 * @param cookies
 * @param tokenType
 * @returns
 */
const getCognitoTokenFromCookiesByTokenType = (
  cookies: Partial<RequestCookie>[],
  tokenType: TokenType
): string | null => {
  const cookie = getCookieByTokenType(cookies, tokenType)
  return cookie && cookie.value
}

/**
 * 目当てのCookie{name: string; value: string} をtokenTypeで抽出する
 * @param cookies
 * @param tokenType
 * @returns
 */
const getCookieByTokenType = (
  cookies: Partial<RequestCookie>[],
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
  const target = cookies.filter((cookie: Partial<RequestCookie>) =>
    regexp.test(cookie.name ?? '')
  )
  if (target.length === 1) {
    const cookie = {
      name: target[0].name ?? tokenType,
      value: target[0].value ?? '',
    }
    return cookie
  } else {
    return null
  }
}
