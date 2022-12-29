import React from 'react'
import { Button } from '~/components/elements/Button'
import { TextField, FormRow } from '~/components/elements/Form'
import { ResetPasswordFormType } from '~/schema/auth/resetPasswordValidator'
import { useResetPassword } from '~/services/auth'
import { useLocale } from '~/services/locale'

const ResetPasswordFields = () => {
  const { methods, FormProvider, onSubmit, loading } = useResetPassword()
  const { t } = useLocale()
  return (
    <FormProvider {...methods}>
      <FormRow>
        <TextField<ResetPasswordFormType>
          label={'検証コード*'}
          fieldName="verification_code"
          autoFocus
        />
      </FormRow>
      <FormRow>
        <TextField<ResetPasswordFormType>
          fieldName="password"
          type="password"
          label={'新しいパスワード*'}
        />
      </FormRow>
      <FormRow className="grid">
        <Button
          text={t.resetPassword.submit}
          loading={loading}
          onClick={methods.handleSubmit(onSubmit)}
        />
      </FormRow>
    </FormProvider>
  )
}

export default ResetPasswordFields
