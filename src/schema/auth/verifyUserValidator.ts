import { AccountVerificationInputs } from '~/schema/generated/@types'
import { yup } from '~/libs/yup'

export const schema: yup.SchemaOf<AccountVerificationInputs> = yup
  .object()
  .shape({
    user_id: yup.string().required(),
    verification_code: yup.string().required().label('検証コード'),
  })

export type AccountVerificationFormType = yup.InferType<typeof schema>
