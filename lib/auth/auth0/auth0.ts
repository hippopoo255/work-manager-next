import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { httpClient } from '@/lib/axios'

const Auth0 = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    getAccessTokenSilently,
  } = useAuth0()

  useEffect(() => {
    let isMounted = true
    if (isMounted && isAuthenticated) {
      const tokenTest = async () => {
        const accessToken = await getAccessTokenSilently({
          audience: process.env.NEXT_PUBLIC_AUTH0_AUTHORIZER_IDENTIFIER || '',
        }).catch((err) => {
          console.error(err)
        })
        if (!!accessToken) {
          const response = await httpClient.get('/private', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          console.log(response)
        }
      }
      tokenTest()
    }
    return () => {
      isMounted = false
    }
  }, [isAuthenticated])

  return {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user,
    getAccessTokenSilently,
  }
}

export default Auth0
