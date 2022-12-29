import type { NextPageWithLayout } from 'next'
import { GetServerSidePropsContext } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { RegisterOrganizationForm } from '~/components/features/organization'
import Layout from '~/components/layouts/Mypage'

const OrganizationRegister: NextPageWithLayout = () => {
  return (
    <div className="u-position-center min-h-full px-4">
      <RegisterOrganizationForm />
    </div>
  )
}

export default OrganizationRegister

OrganizationRegister.getLayout = (page) => (
  <Layout title={i18n?.t('head.title.mypage.organization.register')}>
    {page}
  </Layout>
)

export const getServerSideProps = async ({
  locale,
}: Required<GetServerSidePropsContext>) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'form'])),
    },
  }
}
