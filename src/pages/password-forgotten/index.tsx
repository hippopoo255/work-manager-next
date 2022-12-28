import type { NextPageWithLayout } from 'next'
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

PasswordForgotten.getLayout = (page) => <Layout>{page}</Layout>
