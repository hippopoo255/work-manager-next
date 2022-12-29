import React from 'react'
import { SendPasswordForgottenFields } from './SendPasswordForgottenFields'
import { FormCard } from '~/components/elements/Form'
import { useLocale } from '~/services/locale'

const SendPasswordForgottenForm = () => {
  const { t } = useLocale()
  return (
    <FormCard title={t.sendPasswordForgotten.title}>
      <SendPasswordForgottenFields />
    </FormCard>
  )
}

export default SendPasswordForgottenForm
