import type { NextPageWithLayout } from 'next'
import { GetServerSidePropsContext } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { TaskPage } from '~/components/features/task'
import Layout from '~/components/layouts/Mypage'
import { TMainTitle } from '~/components/layouts/Mypage/types'
import { icons } from '~/config/icon'

const TaskIndex: NextPageWithLayout = () => {
  return (
    <div className="u-container">
      <TaskPage />
    </div>
  )
}

export default TaskIndex

TaskIndex.getLayout = (page) => {
  const title: TMainTitle = {
    text: i18n?.t('title.mypage.task.index'),
    icon: icons.task,
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
