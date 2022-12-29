import { NextPageWithLayout } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { SignUpForm } from '~/components/features/auth'
import Layout from '~/components/layouts/Default'

const SignUp: NextPageWithLayout = () => {
  return (
    <div className="u-position-center min-h-full px-4">
      <SignUpForm />
    </div>
  )
}

export default SignUp

SignUp.getLayout = (page) => (
  <Layout title={i18n?.t('head.title.signUp')}>{page}</Layout>
)

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'form'])),
    },
  }
}
