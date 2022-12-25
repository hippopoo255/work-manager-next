import { ForgotPasswordResetInputs } from '~/schema/generated/@types'
import { yup } from '~/libs/yup'
import { strPatterns } from '~/utils'

export const schema: yup.SchemaOf<ForgotPasswordResetInputs> = yup
  .object()
  .shape({
    user_id: yup.string().required(),
    password: yup
      .string()
      .required()
      .matches(strPatterns.password)
      .label('パスワード'),
    verification_code: yup.string().required().label('検証コード'),
  })

export type ResetPasswordFormType = yup.InferType<typeof schema>
