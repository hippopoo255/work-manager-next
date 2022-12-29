import type { NextPageWithLayout, GetStaticPropsContext } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { SignInForm } from '~/components/features/auth'
import Layout from '~/components/layouts/Default'

const SignIn: NextPageWithLayout = () => {
  return (
    <div className="u-position-center h-full px-4">
      <SignInForm />
    </div>
  )
}

export default SignIn

SignIn.getLayout = (page) => (
  <Layout title={i18n?.t('head.title.signIn')}>{page}</Layout>
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
