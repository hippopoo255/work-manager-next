import type { NextPageWithLayout } from 'next'
import { GetServerSidePropsContext } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '~/components/layouts/Mypage'

const Minutes: NextPageWithLayout = () => {
  return <div>Hello, {'議事録'} Page!!</div>
}

export default Minutes

Minutes.getLayout = (page) => (
  <Layout title={i18n?.t('head.title.mypage.minutes.index')}>{page}</Layout>
)

export const getServerSideProps = async ({
  locale,
}: Required<GetServerSidePropsContext>) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
