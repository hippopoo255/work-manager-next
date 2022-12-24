'use client'

import '~/assets/scss/app.scss'
import { SnackBar } from '~/components/elements/SnackBar'
import { Header, Footer, Main } from '~/components/layouts'
import { AuthProvider } from '~/stores/auth'
import { StatusProvider } from '~/stores/status'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <div className="l-app">
          <AuthProvider>
            <StatusProvider>
              <header className="l-app__header">
                <Header />
              </header>
              <main className="l-app__main">
                <Main title={''}>{children}</Main>
              </main>
              <footer className="l-app__footer">
                <Footer />
              </footer>
              <div className="l-app__snackbar">
                <SnackBar />
              </div>
            </StatusProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}
