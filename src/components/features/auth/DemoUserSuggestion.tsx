import React from 'react'
import { BorderButton } from '~/components/elements/Button'
import { useDemoUserSignIn } from '~/services/auth'
import { useLocale } from '~/services/locale'

const DemoUserSuggestion = () => {
  const { loading, onSubmit } = useDemoUserSignIn()
  const { t } = useLocale()
  return (
    <BorderButton
      text={t.signIn.demoSignIn}
      loading={loading}
      onClick={onSubmit}
    />
  )
}

export default DemoUserSuggestion
