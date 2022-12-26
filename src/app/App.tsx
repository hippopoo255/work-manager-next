'use client'

import React, { useEffect } from 'react'
import { SnackBar } from '~/components/elements/SnackBar'
import { Header, Footer, Main } from '~/components/layouts'
import { useTheme } from '~/services/theme'
import { AuthProvider } from '~/stores/auth'
import { StatusProvider } from '~/stores/status'

const App = ({ children }: { children: React.ReactNode }) => {
  const { theme, init } = useTheme()

  useEffect(() => {
    init()
  }, [])

  return (
    <body data-mode={theme.mode}>
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
  )
}

export default App
