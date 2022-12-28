import type { NextPageWithLayout } from 'next'
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

PasswordReset.getLayout = (page) => <Layout>{page}</Layout>
