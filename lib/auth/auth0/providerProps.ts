const redirectUri = process.env.NEXT_PUBLIC_BASE_URL || ''

const providerProps = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '',
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '',
  // audience: process.env.NEXT_PUBLIC_AUTH0_AUTHORIZER_IDENTIFIER || '',
  redirectUri,
}

export default providerProps
