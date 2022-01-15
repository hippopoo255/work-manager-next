import React, { useState } from 'react'
import { CircularButton } from '@/components/molecules'
import { useLocale, useAuth } from '@/hooks'

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
  const [loading, setLoading] = useState<boolean>(false)
  const { testLogin, auth } = useAuth(true)
  const { t } = useLocale()
  const handleDemoUser = async () => {
    setLoading(true)
    await testLogin().catch((err) => {
      setLoading(false)
      alert(err)
    })
  }

  return (
    !auth.isLogin && (
      <CircularButton
        loading={loading}
        submitText={t.common.testLogin}
        onClick={handleDemoUser}
        options={{ ...options }}
      />
    )
  )
}

export default TestLoginButton
