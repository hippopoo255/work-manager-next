import { SignUpInputs } from '~/schema/generated/@types'
import { Yup, yup } from '~/libs/yup'
import { strPatterns } from '~/utils'
import { TFunction } from 'i18next'

export const schema: ({
  t,
}: {
  t: TFunction<'translation', undefined, 'translation'>
}) => Yup.SchemaOf<SignUpInputs> = ({ t }) => {
  const y = yup()
  return y.object().shape({
    user_id: y
      .string()
      .required()
      .min(8)
      .max(64)
      .label(t('signUp.attributes.user_id')),
    password: y
      .string()
      .required()
      .min(8)
      .max(64)
      .matches(strPatterns.password)
      .label(t('signUp.attributes.pasword')),
    email: y.string().required().email().label(t('signUp.attributes.email')),
    family_name: y
      .string()
      .required()
      .max(255)
      .label(t('signUp.attributes.family_name')),
    given_name: y
      .string()
      .required()
      .max(255)
      .label(t('signUp.attributes.given_name')),
    family_name_kana: y
      .string()
      .required()
      .matches(strPatterns.katakana)
      .label(t('signUp.attributes.family_name_kana')),
    given_name_kana: y
      .string()
      .required()
      .matches(strPatterns.katakana)
      .label(t('signUp.attributes.given_name_kana')),
    address: y.string().label(t('signUp.attributes.address')),
  })
}

export type SignUpFormType = Yup.InferType<ReturnType<typeof schema>>
