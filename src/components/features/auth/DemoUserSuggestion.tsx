import { useTranslation } from 'next-i18next'
import React from 'react'
import { BorderButton } from '~/components/elements/Button'
import { useDemoUserSignIn } from '~/services/auth'

const DemoUserSuggestion = () => {
  const { loading, onSubmit } = useDemoUserSignIn()
  const { t } = useTranslation()
  return (
    <BorderButton
      text={t('signIn.demoSignIn')}
      loading={loading}
      onClick={onSubmit}
    />
  )
}

export default DemoUserSuggestion
