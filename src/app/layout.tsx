'use client'

import '~/assets/scss/app.scss'
import { Header, Footer, Main } from '~/components/organisms'
import { AuthProvider } from '~/stores/auth'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <AuthProvider>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
