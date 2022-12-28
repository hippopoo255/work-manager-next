import type { NextPageWithLayout } from 'next'
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

SignIn.getLayout = (page) => <Layout>{page}</Layout>
