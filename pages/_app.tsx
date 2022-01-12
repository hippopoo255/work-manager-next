import '@/assets/stylesheets/globals.scss'
import { ThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'

import type { AppProps } from 'next/app'
import theme from '@/theme'
import React from 'react'
import { AuthProvider } from '@/provider'
import { Auth0Provider } from '@auth0/auth0-react'

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles: Element | null = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  const redirectUri = process.env.NEXT_PUBLIC_BASE_URL || ''
  const domainObj = {
    domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || '',
    clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '',
    // audience: process.env.NEXT_PUBLIC_AUTH0_AUTHORIZER_IDENTIFIER || '',
    redirectUri,
  }

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Auth0Provider {...domainObj}>
          <Component {...pageProps} />
        </Auth0Provider>
      </AuthProvider>
    </ThemeProvider>
  )
}
export default MyApp
