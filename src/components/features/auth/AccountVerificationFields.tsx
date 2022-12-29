import { useTranslation } from 'next-i18next'
import { Button } from '~/components/elements/Button'
import { TextField, FormRow } from '~/components/elements/Form'
import { AccountVerificationFormType } from '~/schema/auth/verifyUserValidator'
import { useVerifyUser } from '~/services/auth'

export const AccountVerificationFields = () => {
  const { FormProvider, loading, onSubmit, methods } = useVerifyUser()
  const { t } = useTranslation('form')
  return (
    <FormProvider {...methods}>
      <FormRow>
        <TextField<AccountVerificationFormType>
          label={`${t('verifyAccount.attributes.verification_code')}*`}
          fieldName="verification_code"
          autoFocus
        />
      </FormRow>
      <FormRow className="grid">
        <Button
          text={t('verifyAccount.submit')}
          loading={loading}
          onClick={methods.handleSubmit(onSubmit)}
        />
      </FormRow>
    </FormProvider>
  )
}
