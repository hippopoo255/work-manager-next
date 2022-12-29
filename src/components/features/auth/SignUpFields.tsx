import { Button } from '~/components/elements/Button'
import { TextField, FormRow } from '~/components/elements/Form'
import { SignUpFormType } from '~/schema/auth/signUpValidator'
import { useSignUp } from '~/services/auth'
import { useLocale } from '~/services/locale'

export const SignUpFields = () => {
  const { loading, onSubmit, FormProvider, methods } = useSignUp()
  const { t } = useLocale()
  return (
    <FormProvider {...methods}>
      <FormRow>
        <TextField<SignUpFormType>
          label={'ユーザID*'}
          fieldName="user_id"
          autoFocus
        />
      </FormRow>
      <FormRow>
        <TextField<SignUpFormType>
          fieldName="email"
          type="email"
          label={'メールアドレス*'}
        />
      </FormRow>
      <FormRow className="flex gap-2">
        <div className="w-full flex-grow">
          <TextField<SignUpFormType>
            fieldName="family_name"
            type="text"
            label={'姓*'}
          />
        </div>
        <div className="w-full flex-grow">
          <TextField<SignUpFormType>
            fieldName="given_name"
            type="text"
            label={'名*'}
          />
        </div>
      </FormRow>
      <FormRow className="flex gap-2">
        <div className="w-full flex-grow">
          <TextField<SignUpFormType>
            fieldName="family_name_kana"
            type="text"
            label={'セイ*'}
          />
        </div>
        <div className="w-full flex-grow">
          <TextField<SignUpFormType>
            fieldName="given_name_kana"
            type="text"
            label={'メイ*'}
          />
        </div>
      </FormRow>
      <FormRow>
        <TextField<SignUpFormType>
          fieldName="password"
          type="password"
          label={'パスワード*'}
        />
      </FormRow>
      <FormRow className="grid">
        <Button
          text={t.signUp.submit}
          loading={loading}
          onClick={methods.handleSubmit(onSubmit)}
          className={'--signup'}
        />
      </FormRow>
    </FormProvider>
  )
}
