import type { NextPageWithLayout } from 'next'
import { GetServerSidePropsContext } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MinutesList } from '~/components/features/minutes'
import Layout from '~/components/layouts/Mypage'
import { TMainTitle } from '~/components/layouts/Mypage/types'
import { icons } from '~/config/icon'

const Minutes: NextPageWithLayout = () => {
  return (
    <div className="u-container">
      <div className="p-card">
        <div className="p-card__inner">
          <MinutesList />
        </div>
      </div>
    </div>
  )
}

export default Minutes

Minutes.getLayout = (page) => {
  const title: TMainTitle = {
    text: i18n?.t('title.mypage.minutes.index'),
    icon: icons.minutes,
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
