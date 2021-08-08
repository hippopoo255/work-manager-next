import '@/assets/stylesheets/globals.scss'
import { ThemeProvider } from '@material-ui/core/styles'
import { StylesProvider } from '@material-ui/styles'
import type { AppProps } from 'next/app'
import theme from '@/theme'
import PropTypes from 'prop-types'
import React from 'react'

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
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
