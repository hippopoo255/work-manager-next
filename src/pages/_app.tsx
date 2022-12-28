import '~/assets/scss/app.scss'
import { AxiosRequestConfig } from 'axios'
import type { AppPropsWithLayout } from 'next/app'
import { SWRConfig } from 'swr'
import { fetch } from '~/libs/http_clients/axios'
import { AuthProvider } from '~/stores/auth'
import { StatusProvider } from '~/stores/status'
import { ThemeProvider } from '~/stores/theme'

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ThemeProvider>
      <StatusProvider>
        <AuthProvider>
          <SWRConfig
            value={{
              fetcher: (key: string, config?: AxiosRequestConfig) =>
                fetch(key, config),
            }}
          >
            {getLayout(<Component {...pageProps} />)}
          </SWRConfig>
        </AuthProvider>
      </StatusProvider>
    </ThemeProvider>
  )
}
