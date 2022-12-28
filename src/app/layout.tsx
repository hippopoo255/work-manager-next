import '~/assets/scss/app.scss'
import App from './App'
import { ThemeProvider } from '~/stores/theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <html>
        <head />
        <App>{children}</App>
      </html>
    </ThemeProvider>
  )
}
