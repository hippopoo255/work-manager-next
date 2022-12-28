import { NextPageWithLayout } from 'next'
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

SignUp.getLayout = (page) => <Layout>{page}</Layout>
