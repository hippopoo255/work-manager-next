import { ForgotPasswordInputs } from '~/schema/generated/@types'
import { TFunction } from 'i18next'
import { Yup, yup } from '~/libs/yup'

export const schema: ({
  t,
}: {
  t: TFunction<'translation', undefined, 'translation'>
}) => Yup.SchemaOf<ForgotPasswordInputs> = ({ t }) => {
  const y = yup()
  return y.object().shape({
    user_id: y
      .string()
      .required()
      .label(t('sendPasswordForgotten.attributes.user_id')),
  })
}

export type SendPasswordForgottenFormType = Yup.InferType<
  ReturnType<typeof schema>
>
