import '~/assets/scss/app.scss'
import { useRouter } from 'next/navigation'
import App from './App'
import { ThemeProvider } from '~/stores/theme'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const router = useRouter()
  // router.refresh()
  return (
    <ThemeProvider>
      <html>
        <head />
        <App>{children}</App>
      </html>
    </ThemeProvider>
  )
}
