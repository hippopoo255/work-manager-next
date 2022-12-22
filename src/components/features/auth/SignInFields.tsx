'use client'

import { Button } from '~/components/elements/Button'
import { TextField } from '~/components/elements/Field'
import { SignInFormType } from '~/schema/auth/signInValidator'

type Props = {
  loading: boolean
  onSubmit: React.MouseEventHandler<HTMLButtonElement>
}

export const SignInFields = ({ loading, onSubmit }: Props) => {
  return (
    <>
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
          <Button text="サインイン" loading={loading} onClick={onSubmit} />
        </div>
      </form>
    </>
  )
}

// export default SignInFields
