import { useTranslation } from 'next-i18next'
import React from 'react'
import { BorderButton } from '~/components/elements/Button'
import { useDemoUserSignIn } from '~/services/auth'

type Props = {
  flat?: boolean
}

const DemoUserSuggestion = ({ flat }: Props) => {
  const { loading, onSubmit } = useDemoUserSignIn()
  const { t } = useTranslation()
  return (
    <BorderButton
      text={t('label.demoSignIn')}
      loading={loading}
      onClick={onSubmit}
      flat={flat ?? false}
    />
  )
}

export default DemoUserSuggestion
