import { useTranslation } from 'next-i18next'
import React from 'react'
import ResetPasswordFields from './ResetPasswordFields'
import { FormCard } from '~/components/elements/Form'

const ResetPasswordForm = () => {
  const { t } = useTranslation('form')
  return (
    <FormCard title={t('resetPassword.title') ?? ''}>
      <ResetPasswordFields />
    </FormCard>
  )
}

export default ResetPasswordForm
