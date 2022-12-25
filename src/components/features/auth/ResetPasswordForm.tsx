import React from 'react'
import ResetPasswordFields from './ResetPasswordFields'
import { FormCard } from '~/components/elements/Form'

const ResetPasswordForm = () => {
  return (
    <FormCard title="パスワード再設定フォーム">
      <ResetPasswordFields />
    </FormCard>
  )
}

export default ResetPasswordForm
