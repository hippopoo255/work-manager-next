import AppLayout from '../AppLayout'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import SideMenu from './SideMenu'
import { TMainTitle } from './types'
import { SnackBar } from '~/components/elements/SnackBar'
import { useInitialFetch } from '~/services/auth'

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode
  title?: TMainTitle
}) {
  useInitialFetch()

  return (
    <AppLayout title={title?.text} className=" --mypage">
      <header className="l-app__header">
        <Header />
      </header>
      <aside className="l-app__side">
        <SideMenu />
      </aside>
      <main className="l-app__main">
        <Main title={title}>{children}</Main>
      </main>
      <footer className="l-app__footer">
        <Footer />
      </footer>
      <div className="l-app__snackbar">
        <SnackBar />
      </div>
    </AppLayout>
  )
}
