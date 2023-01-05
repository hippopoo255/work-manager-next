import { RegisterOrganizationForm as GeneratedForm } from '~/schema/generated/@types'
import { Yup, yup } from '~/libs/yup'
import { strPatterns } from '~/utils'
import { TFunction } from 'i18next'

export const schema: ({
  t,
}: {
  t: TFunction<'translation', undefined, 'translation'>
}) => Yup.SchemaOf<GeneratedForm> = ({ t }) => {
  const y = yup()
  return y.object().shape({
    name: y
      .string()
      .required()
      .max(255)
      .label(t('organization.register.attributes.name')),
    name_kana: y
      .string()
      .required()
      .max(255)
      .matches(strPatterns.katakana)
      .label(t('organization.register.attributes.name_kana')),
    postal_code: y
      .string()
      .required()
      .matches(strPatterns.postal)
      .label(t('organization.register.attributes.postal_code')),
    pref_id: y
      .number()
      .required()
      .integer()
      .min(1, t('organization.register.requiredPrefId') ?? '')
      .label(t('organization.register.attributes.pref_id')),
    city: y
      .string()
      .required()
      .max(255)
      .label(t('organization.register.attributes.city')),
    address: y
      .string()
      .required()
      .max(255)
      .label(t('organization.register.attributes.address')),
    tel: y
      .string()
      .required()
      .matches(strPatterns.tel)
      .label(t('organization.register.attributes.tel')),
    password: y
      .string()
      .required()
      .matches(strPatterns.password)
      .label(t('organization.register.attributes.password')),
  })
}

export type RegisterOrganizationForm = Yup.InferType<ReturnType<typeof schema>>
