import React, { useState } from 'react'
import { CircularButton } from '@/components/molecules'
import { useRouter } from 'next/router'
import { User } from '@/interfaces/models'
import { postRequest, requestUri } from '@/api'

type Props = {
  options?: {
    [k: string]: boolean | string
  }
}

const TestLoginButton = ({
  options = {
    variant: 'outlined',
    color: 'secondary',
    fullWidth: true,
  },
}: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleDemoUser = async () => {
    setLoading(true)
    await testLogin()
      .then((testUser) => {
        router.push('/mypage')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const testLogin = async () =>
    await postRequest<User, {}>(requestUri.testLogin, {})

  return (
    <CircularButton
      loading={loading}
      submitText="デモユーザとして試す"
      onClick={handleDemoUser}
      options={{ ...options }}
    />
  )
}

export default TestLoginButton
