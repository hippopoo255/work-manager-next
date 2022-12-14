import '~/assets/scss/app.scss'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { fetch } from '~/libs/http_clients/axios'
import { AuthProvider } from '~/stores/auth'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (key: string, config?: any) => fetch(key, config),
      }}
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SWRConfig>
  )
}
