import { cookies } from 'next/headers'
import React from 'react'
import { getCognitoTokenFromNextHeader } from '~/libs/auth/cognito/tokenState/cookie'

const page = () => {
  const nextCookies = getCognitoTokenFromNextHeader(cookies().getAll())

  return <div>{nextCookies?.accessToken}</div>
}

export default page
