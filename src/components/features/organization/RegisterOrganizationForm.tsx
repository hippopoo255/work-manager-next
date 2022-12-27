import { RegisterOrganizationFields } from './RegisterOrganizationFields'
import { FormCard } from '~/components/elements/Form'

const RegisterOrganizationForm = () => {
  return (
    <FormCard title="まずは組織情報の登録をお願いします">
      <RegisterOrganizationFields />
    </FormCard>
  )
}

export default RegisterOrganizationForm
