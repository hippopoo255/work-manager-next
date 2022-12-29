import { Button } from '~/components/elements/Button'
import { TextField, FormRow } from '~/components/elements/Form'
import { SignInFormType } from '~/schema/auth/signInValidator'
import { useSignIn } from '~/services/auth'
import { useLocale } from '~/services/locale'

export const SignInFields = () => {
  const { loading, onSubmit, FormProvider, methods } = useSignIn()
  const { t } = useLocale()
  return (
    <FormProvider {...methods}>
      <FormRow>
        <TextField<SignInFormType>
          label={'ログインID*'}
          fieldName="user_id"
          autoFocus
        />
      </FormRow>
      <FormRow>
        <TextField<SignInFormType>
          fieldName="password"
          type="password"
          label={'パスワード*'}
        />
      </FormRow>
      <FormRow className="grid">
        <Button
          text={t.signIn.submit}
          loading={loading}
          onClick={methods.handleSubmit(onSubmit)}
          className="--signin"
        />
      </FormRow>
    </FormProvider>
  )
}
