'use client'

import '~/assets/scss/app.scss'
import { Header, Footer, Main } from '~/components/layouts'
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
        <div className="l-app">
          <AuthProvider>
            <header className="l-app__header">
              <Header />
            </header>
            <main className="l-app__main">
              <Main title={''}>{children}</Main>
            </main>
            <footer className="l-app__footer">
              <Footer />
            </footer>
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}
