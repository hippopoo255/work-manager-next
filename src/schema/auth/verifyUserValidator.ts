import { AccountVerificationInputs } from '~/schema/generated/@types'
import { Yup, yup } from '~/libs/yup'
import { TFunction } from 'i18next'

export const schema: ({
  t,
}: {
  t: TFunction
}) => Yup.SchemaOf<AccountVerificationInputs> = ({ t }) => {
  const y = yup()
  return y.object().shape({
    user_id: y.string().required(),
    verification_code: y
      .string()
      .required()
      .label(t('verifyAccount.attributes.verification_code')),
  })
}

export type AccountVerificationFormType = Yup.InferType<
  ReturnType<typeof schema>
>
