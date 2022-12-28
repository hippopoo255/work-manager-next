import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import { SnackBar } from '~/components/elements/SnackBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="l-app">
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
    </div>
  )
}
