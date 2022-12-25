import { ForgotPasswordInputs } from '~/schema/generated/@types'
import { yup } from '~/libs/yup'

export const schema: yup.SchemaOf<ForgotPasswordInputs> = yup.object().shape({
  user_id: yup.string().required().label('ログインIDまたはメールアドレス'),
})

export type SendPasswordForgottenFormType = yup.InferType<typeof schema>
