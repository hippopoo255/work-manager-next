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
          fieldName="user_id"
          label={`${t('signUp.attributes.user_id')}*`}
          placeholder={`${t('signUp.placeholder.user_id')}`}
          autoFocus
        />
      </FormRow>
      <FormRow>
        <TextField<SignUpFormType>
          fieldName="email"
          label={`${t('signUp.attributes.email')}*`}
          placeholder={`${t('signUp.placeholder.email')}`}
          type="email"
        />
      </FormRow>
      <FormRow className="flex gap-2">
        <div className="w-full flex-grow">
          <TextField<SignUpFormType>
            fieldName="family_name"
            label={`${t('signUp.attributes.family_name')}*`}
            placeholder={`${t('signUp.placeholder.family_name')}`}
            type="text"
          />
        </div>
        <div className="w-full flex-grow">
          <TextField<SignUpFormType>
            fieldName="given_name"
            label={`${t('signUp.attributes.given_name')}*`}
            placeholder={`${t('signUp.placeholder.given_name')}`}
            type="text"
          />
        </div>
      </FormRow>
      <FormRow className="flex gap-2">
        <div className="w-full flex-grow">
          <TextField<SignUpFormType>
            fieldName="family_name_kana"
            label={`${t('signUp.attributes.family_name_kana')}*`}
            placeholder={`${t('signUp.placeholder.family_name_kana')}`}
            type="text"
          />
        </div>
        <div className="w-full flex-grow">
          <TextField<SignUpFormType>
            fieldName="given_name_kana"
            label={`${t('signUp.attributes.given_name_kana')}*`}
            placeholder={`${t('signUp.placeholder.given_name_kana')}`}
            type="text"
          />
        </div>
      </FormRow>
      <FormRow>
        <TextField<SignUpFormType>
          fieldName="password"
          label={`${t('signUp.attributes.password')}*`}
          placeholder={`${t('signUp.placeholder.password')}`}
          type="password"
          suggest
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
