import type { NextPageWithLayout } from 'next'
import { GetServerSidePropsContext } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RegisterOrganizationForm } from '~/components/features/organization'
import Layout from '~/components/layouts/Mypage'
import { TMainTitle } from '~/components/layouts/Mypage/types'
import { icons } from '~/config/icon'

const OrganizationRegister: NextPageWithLayout = () => {
  const router = useRouter()
  useEffect(() => {
    router.prefetch('/mypage')
  }, [])

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        ></meta>
      </Head>
      <div className="u-position-center min-h-full px-4">
        <RegisterOrganizationForm />
      </div>
    </>
  )
}

export default OrganizationRegister

OrganizationRegister.getLayout = (page) => {
  const title: TMainTitle = {
    text: i18n?.t('head.title.mypage.organization.register'),
    icon: icons.organization,
    position: 'center',
  }

  return <Layout title={title}>{page}</Layout>
}

export const getServerSideProps = async ({
  locale,
}: Required<GetServerSidePropsContext>) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'form'])),
    },
  }
}
