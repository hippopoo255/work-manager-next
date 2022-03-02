/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import { useLocale } from '@/hooks'
import { Footer } from '@/components/organisms'
import { Header, Main, MainVisual } from '@/components/organisms/top'
import { TestLoginSuggestion } from '@/components/molecules/top'
import Features from '@/lib/features'
import {
  ChatSection,
  MinutesSection,
  ScheduleSection,
  TaskSection,
} from '@/components/organisms/top'

const Home = () => {
  const { t } = useLocale()
  const description = t.main.description.replace(':site_title', t.siteTitle)
  return (
    <div className={'u-animation-fadein'}>
      <Head>
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        ></meta>
        <link
          href="https://fonts.googleapis.com/css?family=Teko&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Oswald:700&display=swap"
          rel="stylesheet"
        />
        <title>{t.siteTitle}</title>
      </Head>
      <Header />
      <Main top>
        <MainVisual />
        <MinutesSection />
        <ScheduleSection />
        <TaskSection />
        <ChatSection />
      </Main>
      <TestLoginSuggestion />
      <Footer />
    </div>
  )
}

export default Home
