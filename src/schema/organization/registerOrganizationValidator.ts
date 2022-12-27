import { RegisterOrganizationForm as GeneratedForm } from '~/schema/generated/@types'
import { yup } from '~/libs/yup'
import { strPatterns } from '~/utils'

export const schema: yup.SchemaOf<GeneratedForm> = yup.object().shape({
  name: yup.string().required().max(255).label('組織名'),
  name_kana: yup
    .string()
    .required()
    .max(255)
    .matches(strPatterns.katakana)
    .label('組織名(カナ)'),
  postal_code: yup
    .string()
    .required()
    .matches(strPatterns.postal)
    .label('郵便番号'),
  pref_id: yup.number().required().integer().label('都道府県'),
  city: yup.string().required().max(255).label('市区町村'),
  address: yup.string().required().max(255).label('以降の住所'),
  tel: yup.string().required().matches(strPatterns.tel).label('電話番号'),
  password: yup
    .string()
    .required()
    .matches(strPatterns.password)
    .label('管理システム用アカウントのパスワード'),
})

export type RegisterOrganizationForm = yup.InferType<typeof schema>
