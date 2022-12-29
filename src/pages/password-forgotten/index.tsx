import type { NextPageWithLayout, GetStaticPropsContext } from 'next'
import { i18n } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { SendPasswordForgottenForm } from '~/components/features/auth'
import Layout from '~/components/layouts/Default'

const PasswordForgotten: NextPageWithLayout = () => {
  return (
    <div className="u-position-center h-full px-4">
      <SendPasswordForgottenForm />
    </div>
  )
}

export default PasswordForgotten

PasswordForgotten.getLayout = (page) => (
  <Layout title={i18n?.t('head.title.passwordForgotten')}>{page}</Layout>
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
