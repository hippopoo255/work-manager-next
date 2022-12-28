import type { NextPageWithLayout } from 'next'
import { RegisterOrganizationForm } from '~/components/features/organization'
import Layout from '~/components/layouts/Mypage'

const OrganizationRegister: NextPageWithLayout = () => {
  return (
    <div className="u-position-center min-h-full px-4">
      <RegisterOrganizationForm />
    </div>
  )
}

export default OrganizationRegister

OrganizationRegister.getLayout = (page) => <Layout>{page}</Layout>
