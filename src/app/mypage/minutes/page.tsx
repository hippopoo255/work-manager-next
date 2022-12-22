'use client'

import { useAuthContext } from '~/services/auth'

const Minutes = () => {
  const { auth, dispatch } = useAuthContext()
  return <div>Hello, {'議事録'} Page!!</div>
}

export default Minutes
