import type { NextPageWithLayout } from 'next'
import Layout from '~/components/layouts/Mypage'
import { useAuthContext } from '~/services/auth'

const MyPage: NextPageWithLayout = () => {
  const { auth } = useAuthContext()
  return <div>Hello, {auth.user.full_name}!!</div>
}

export default MyPage

MyPage.getLayout = (page) => <Layout title="マイページ">{page}</Layout>
