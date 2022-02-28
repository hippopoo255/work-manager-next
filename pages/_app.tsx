import 'swiper/swiper-bundle.min.css'
import '@/assets/scss/globals.scss'
// import 'swiper/swiper.scss'
// import 'swiper/swiper.min.css'
import { ThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'

import type { AppProps } from 'next/app'
import theme from '@/theme'
import React from 'react'
import { AuthProvider, Auth0CustomProvider } from '@/provider'

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles: Element | null = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}
export default MyApp
