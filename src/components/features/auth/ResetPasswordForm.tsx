import React from 'react'
import ResetPasswordFields from './ResetPasswordFields'
import { FormCard } from '~/components/elements/Form'
import { useLocale } from '~/services/locale'

const ResetPasswordForm = () => {
  const { t } = useLocale()
  return (
    <FormCard title={t.resetPassword.title}>
      <ResetPasswordFields />
    </FormCard>
  )
}

export default ResetPasswordForm
