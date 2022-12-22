'use client'

import { Button } from '~/components/elements/Button'
import { TextField } from '~/components/elements/Field'
import { SignInFormType } from '~/schema/auth/signInValidator'
import { useSignIn } from '~/services/auth'

type Props = {
  loading: boolean
  onSubmit: React.MouseEventHandler<HTMLButtonElement>
}

export const SignInFields = () => {
  const { loading, onSubmit, FormProvider, methods } = useSignIn()
  return (
    <FormProvider {...methods}>
      <form>
        <div className="mt-8">
          <TextField<SignInFormType>
            label={'ログインID*'}
            fieldName="user_id"
            autoFocus
          />
        </div>
        <div className="mt-8">
          <TextField<SignInFormType>
            fieldName="password"
            type="password"
            label={'パスワード*'}
          />
        </div>
        <div className="mt-8 grid">
          <Button
            text="サインイン"
            loading={loading}
            onClick={methods.handleSubmit(onSubmit)}
          />
        </div>
      </form>
    </FormProvider>
  )
}

// export default SignInFields
