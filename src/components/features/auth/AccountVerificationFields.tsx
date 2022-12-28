import { Button } from '~/components/elements/Button'
import { TextField, FormRow } from '~/components/elements/Form'
import { AccountVerificationFormType } from '~/schema/auth/verifyUserValidator'
import { useVerifyUser } from '~/services/auth'

export const AccountVerificationFields = () => {
  const { FormProvider, loading, onSubmit, methods } = useVerifyUser()
  return (
    <FormProvider {...methods}>
      <FormRow>
        <TextField<AccountVerificationFormType>
          label={'検証コード*'}
          fieldName="verification_code"
          autoFocus
        />
      </FormRow>
      <FormRow className="grid">
        <Button
          text="検証コードを送信"
          loading={loading}
          onClick={methods.handleSubmit(onSubmit)}
        />
      </FormRow>
    </FormProvider>
  )
}

// export default AccountVerificationFields
