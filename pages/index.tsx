/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import { Section } from '@/components/atoms/top'
import { useLocale } from '@/hooks'
import { Footer } from '@/components/organisms'
import { Header, Main, MainVisual } from '@/components/organisms/top'
import { TestLoginSuggestion } from '@/components/molecules/top'
import Features from '@/lib/features'

const Home = () => {
  const { t } = useLocale()
  const description = t.main.description.replace(':site_title', t.siteTitle)
  const features = Features()
  return (
    <div className={'u-animation-fadein'}>
      <Head>
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        ></meta>
        <link
          href="https://fonts.googleapis.com/css?family=Vollkorn&display=swap"
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
        {features.slice(0, 4).map((feature) => (
          <Section key={feature.to} id={feature.to.replace('#', '')}>
            {/* 議事録管理 */}
            {feature.component || feature.to.replace('#', '')}
          </Section>
        ))}
      </Main>
      <TestLoginSuggestion />
      <Footer />
    </div>
  )
}

export default Home
