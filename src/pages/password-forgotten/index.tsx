import type { NextPageWithLayout, GetStaticPropsContext } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import React from 'react'
import { SendPasswordForgottenForm } from '~/components/features/auth'
import Layout from '~/components/layouts/Default'

const PasswordForgotten: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        ></meta>
      </Head>
      <div className="u-position-center h-full px-4">
        <SendPasswordForgottenForm />
      </div>
    </>
  )
}

export default PasswordForgotten

PasswordForgotten.getLayout = (page) => (
  <Layout title={i18n?.t('title.passwordForgotten')}>{page}</Layout>
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
