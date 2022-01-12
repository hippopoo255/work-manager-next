import React, { useState, useContext } from 'react'
import { CircularButton } from '@/components/molecules'
import { useRouter } from 'next/router'
import { User } from '@/interfaces/models'
import { postRequest, requestUri } from '@/api'
import { loginAction } from '@/globalState/user/action'
import { AuthContext } from '@/provider/AuthProvider'
import { useLocale } from '@/hooks'

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
  const { dispatch } = useContext(AuthContext)
  const { t } = useLocale()
  const handleDemoUser = async () => {
    setLoading(true)
    await testLogin()
      .then((testUser) => {
        dispatch(loginAction(testUser))
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
      submitText={t.common.testLogin}
      onClick={handleDemoUser}
      options={{ ...options }}
    />
  )
}

export default TestLoginButton
