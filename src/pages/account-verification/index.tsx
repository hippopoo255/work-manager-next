import { GetStaticPropsContext } from 'next'
import type { NextPageWithLayout } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import React from 'react'
import { AccountVerificationForm } from '~/components/features/auth'
import Layout from '~/components/layouts/Default'

const AccountVerification: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        ></meta>
      </Head>
      <div className="u-position-center h-full px-4">
        <AccountVerificationForm />
      </div>
    </>
  )
}

export default AccountVerification

AccountVerification.getLayout = (page) => (
  <Layout title={i18n?.t('head.title.accountVerification')}>{page}</Layout>
)

export const getStaticProps = async ({
  locale,
}: Required<GetStaticPropsContext>) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'form'])),
    },
  }
}