import type { NextPageWithLayout } from 'next'
import { GetServerSidePropsContext } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '~/components/layouts/Mypage'
import { TMainTitle } from '~/components/layouts/Mypage/types'
import { icons } from '~/config'

const MyPage: NextPageWithLayout = () => {
  return (
    <div className="u-container">
      <ul>
        {[...Array(500)].map((_, i) => (
          <li key={i}>{i + 1}</li>
        ))}
      </ul>
    </div>
  )
}

export default MyPage

MyPage.getLayout = (page) => {
  const title: TMainTitle = {
    text: i18n?.t('head.title.mypage.index'),
    icon: icons.dashboard,
  }
  return <Layout title={title}>{page}</Layout>
}

export const getServerSideProps = async ({
  locale,
}: Required<GetServerSidePropsContext>) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
