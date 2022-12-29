import type { NextPageWithLayout } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { ResetPasswordForm } from '~/components/features/auth'
import Layout from '~/components/layouts/Default'

const PasswordReset: NextPageWithLayout = () => {
  return (
    <div className="u-position-center h-full px-4">
      <ResetPasswordForm />
    </div>
  )
}

export default PasswordReset

PasswordReset.getLayout = (page) => (
  <Layout title={i18n?.t('head.title.passwordReset')}>{page}</Layout>
)

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'form'])),
    },
  }
}
