import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import { SnackBar } from '~/components/elements/SnackBar'
import { useInitialFetch } from '~/services/auth'

export default function Layout({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  useInitialFetch()

  return (
    <>
      <Head>
        <title>{!!title ? `${title} | ${'ジョブサポ'}` : 'ジョブサポ'}</title>
      </Head>
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
    </>
  )
}
