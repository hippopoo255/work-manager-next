import { decodeProtectedHeader, importJWK, jwtVerify } from 'jose'
import { CognitoRefreshTokenResult } from './types'
import {
  AWS_COGNITO_CLIENT_ID,
  AWS_COGNITO_REGION,
  AWS_COGNITO_USER_POOL_ID,
  AWS_COGNITO_URL,
} from '~/config/auth'

const cognitoIdpUrl = `https://cognito-idp.${AWS_COGNITO_REGION}.amazonaws.com`
const userPoolId: string = AWS_COGNITO_USER_POOL_ID

export const verifyCognitoToken = async (token: string) => {
  // Get keys from AWS
  const { keys } = (await fetch(
    `${cognitoIdpUrl}/${userPoolId}/.well-known/jwks.json`
  ).then((res) => res.json())) as { keys: [{ kid: string }] }
  // Decode the user's token
  const { kid } = decodeProtectedHeader(token)
  // Find the user's decoded token in the Cognito keys
  const jwk = keys.find((key) => key.kid === kid)

  if (!jwk) {
    throw Error('JWK is not found in the token')
  }

  // Import JWT using the JWK
  const jwtImport = await importJWK(jwk)
  // Verify the users JWT
  await jwtVerify(token, jwtImport)
}

export const refreshCognitoToken = async (
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
