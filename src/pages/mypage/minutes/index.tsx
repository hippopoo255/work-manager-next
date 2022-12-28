import type { NextPageWithLayout } from 'next'
import Layout from '~/components/layouts/Mypage'
import { useAuthContext } from '~/services/auth'

const Minutes: NextPageWithLayout = () => {
  const { auth } = useAuthContext()
  return <div>Hello, {'議事録'} Page!!</div>
}

export default Minutes

Minutes.getLayout = (page) => <Layout>{page}</Layout>
