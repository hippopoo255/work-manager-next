import { SignInInputs } from '~/schema/generated/@types'
import { yup } from '~/libs/yup'

export const schema: yup.SchemaOf<SignInInputs> = yup.object().shape({
  user_id: yup.string().required().label('ログインIDまたはメールアドレス'),
  password: yup.string().required().label('パスワード'),
})

export type SignInFormType = yup.InferType<typeof schema>
