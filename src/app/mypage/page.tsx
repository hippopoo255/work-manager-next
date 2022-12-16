'use client'

import { useAuthContext } from '~/services/auth'

const MyPage = () => {
  const { auth, dispatch } = useAuthContext()
  return <div>Hello, {'auth.user.full_name'}!!</div>
}

export default MyPage
