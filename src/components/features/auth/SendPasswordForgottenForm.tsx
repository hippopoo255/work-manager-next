import { useTranslation } from 'next-i18next'
import React from 'react'
import { SendPasswordForgottenFields } from './SendPasswordForgottenFields'
import { FormCard } from '~/components/elements/Form'

const SendPasswordForgottenForm = () => {
  const { t } = useTranslation('form')
  return (
    <FormCard title={t('sendPasswordForgotten.title') ?? ''}>
      <SendPasswordForgottenFields />
    </FormCard>
  )
}

export default SendPasswordForgottenForm
