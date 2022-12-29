import { ForgotPasswordResetInputs } from '~/schema/generated/@types'
import { Yup, yup } from '~/libs/yup'
import { strPatterns } from '~/utils'
import { TFunction } from 'i18next'

export const schema: ({
  t,
}: {
  t: TFunction<'translation', undefined, 'translation'>
}) => Yup.SchemaOf<ForgotPasswordResetInputs> = ({ t }) => {
  const y = yup()
  return y.object().shape({
    user_id: y.string().required(),
    password: y
      .string()
      .required()
      .matches(strPatterns.password)
      .label(t('resetPassword.attributes.password')),
    verification_code: y
      .string()
      .required()
      .label(t('resetPassword.attributes.verification_code')),
  })
}

export type ResetPasswordFormType = Yup.InferType<ReturnType<typeof schema>>
