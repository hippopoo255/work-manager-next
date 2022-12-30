import type { NextPageWithLayout } from 'next'
import { GetServerSidePropsContext } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Layout from '~/components/layouts/Mypage'
import { useAuthContext } from '~/services/auth'

const MyPage: NextPageWithLayout = () => {
  const { auth } = useAuthContext()

  return (
    <div>
      <ul>
        <li></li>
      </ul>
    </div>
  )
}

export default MyPage

MyPage.getLayout = (page) => (
  <Layout title={i18n?.t('head.title.mypage.index')}>{page}</Layout>
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
