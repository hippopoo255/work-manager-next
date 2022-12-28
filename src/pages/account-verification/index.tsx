import type { NextPageWithLayout } from 'next'
import React from 'react'
import { AccountVerificationForm } from '~/components/features/auth'
import Layout from '~/components/layouts/Default'

const AccountVerification: NextPageWithLayout = () => {
  return (
    <div className="u-position-center h-full px-4">
      <AccountVerificationForm />
    </div>
  )
}

export default AccountVerification

AccountVerification.getLayout = (page) => <Layout>{page}</Layout>
