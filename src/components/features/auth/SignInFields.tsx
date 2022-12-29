import { useTranslation } from 'next-i18next'
import { Button } from '~/components/elements/Button'
import { TextField, FormRow } from '~/components/elements/Form'
import { SignInFormType } from '~/schema/auth/signInValidator'
import { useSignIn } from '~/services/auth'

export const SignInFields = () => {
  const { loading, onSubmit, FormProvider, methods } = useSignIn()
  const { t } = useTranslation('form')
  return (
    <FormProvider {...methods}>
      <FormRow>
        <TextField<SignInFormType>
          label={`${t('signIn.attributes.user_id')}*`}
          fieldName="user_id"
          autoFocus
        />
      </FormRow>
      <FormRow>
        <TextField<SignInFormType>
          fieldName="password"
          type="password"
          label={`${t('signIn.attributes.password')}*`}
        />
      </FormRow>
      <FormRow className="grid">
        <Button
          text={t('signIn.submit')}
          loading={loading}
          onClick={methods.handleSubmit(onSubmit)}
          className="--signin"
        />
      </FormRow>
    </FormProvider>
  )
}
