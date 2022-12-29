import { useTranslation } from 'next-i18next'
import { Button } from '~/components/elements/Button'
import { TextField, FormRow } from '~/components/elements/Form'
import { SignUpFormType } from '~/schema/auth/signUpValidator'
import { useSignUp } from '~/services/auth'

export const SignUpFields = () => {
  const { loading, onSubmit, FormProvider, methods } = useSignUp()
  const { t } = useTranslation('form')
  return (
    <FormProvider {...methods}>
      <FormRow>
        <TextField<SignUpFormType>
          label={`${t('signUp.attributes.user_id')}*`}
          fieldName="user_id"
          autoFocus
        />
      </FormRow>
      <FormRow>
        <TextField<SignUpFormType>
          fieldName="email"
          type="email"
          label={`${t('signUp.attributes.email')}*`}
        />
      </FormRow>
      <FormRow className="flex gap-2">
        <div className="w-full flex-grow">
          <TextField<SignUpFormType>
            fieldName="family_name"
            type="text"
            label={`${t('signUp.attributes.family_name')}*`}
          />
        </div>
        <div className="w-full flex-grow">
          <TextField<SignUpFormType>
            fieldName="given_name"
            type="text"
            label={`${t('signUp.attributes.given_name')}*`}
          />
        </div>
      </FormRow>
      <FormRow className="flex gap-2">
        <div className="w-full flex-grow">
          <TextField<SignUpFormType>
            fieldName="family_name_kana"
            type="text"
            label={`${t('signUp.attributes.family_name_kana')}*`}
          />
        </div>
        <div className="w-full flex-grow">
          <TextField<SignUpFormType>
            fieldName="given_name_kana"
            type="text"
            label={`${t('signUp.attributes.given_name_kana')}*`}
          />
        </div>
      </FormRow>
      <FormRow>
        <TextField<SignUpFormType>
          fieldName="password"
          type="password"
          label={`${t('signUp.attributes.password')}*`}
        />
      </FormRow>
      <FormRow className="grid">
        <Button
          text={t('signUp.submit')}
          loading={loading}
          onClick={methods.handleSubmit(onSubmit)}
          className={'--signup'}
        />
      </FormRow>
    </FormProvider>
  )
}
