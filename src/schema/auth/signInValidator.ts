import { SignInInputs } from '~/schema/generated/@types'
import { Yup, yup } from '~/libs/yup'
import { TFunction } from 'i18next'

export const schema: ({
  t,
}: {
  t: TFunction<'translation', undefined, 'translation'>
}) => Yup.SchemaOf<SignInInputs> = ({ t }) => {
  const y = yup()
  return y.object().shape({
    user_id: y.string().required().label(t('signIn.attributes.user_id')),
    password: y.string().required().label(t('signIn.attributes.password')),
  })
}

export type SignInFormType = Yup.InferType<ReturnType<typeof schema>>
