import type { NextPageWithLayout, GetStaticPropsContext } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import React from 'react'
import { ResetPasswordForm } from '~/components/features/auth'
import Layout from '~/components/layouts/Default'

const PasswordReset: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        ></meta>
      </Head>
      <div className="u-position-center h-full px-4">
        <ResetPasswordForm />
      </div>
    </>
  )
}

export default PasswordReset

PasswordReset.getLayout = (page) => (
  <Layout title={i18n?.t('head.title.passwordReset')}>{page}</Layout>
)

export async function getStaticProps({
  locale,
}: Required<GetStaticPropsContext>) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'form'])),
    },
  }
}
