import { SignUpInputs } from '~/schema/generated/@types'
import { yup } from '~/libs/yup'
import { strPatterns } from '~/utils'

export const schema: yup.SchemaOf<SignUpInputs> = yup.object().shape({
  user_id: yup.string().required().min(8).max(64).label('ユーザID'),
  password: yup
    .string()
    .required()
    .min(8)
    .max(64)
    .matches(strPatterns.password)
    .label('パスワード'),
  email: yup.string().required().email().label('メールアドレス'),
  family_name: yup.string().required().max(255).label('姓'),
  given_name: yup.string().required().max(255).label('名'),
  family_name_kana: yup
    .string()
    .required()
    .matches(strPatterns.katakana)
    .label('セイ'),
  given_name_kana: yup
    .string()
    .required()
    .matches(strPatterns.katakana)
    .label('メイ'),
  address: yup.string().label('住所'),
})

export type SignUpFormType = yup.InferType<typeof schema>
