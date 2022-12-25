import { AccountVerificationFields } from './AccountVerificationFields'
import { FormCard } from '~/components/elements/Form'

const AccountVerificationForm = () => {
  return (
    <FormCard title={'アカウント検証'}>
      <AccountVerificationFields />
    </FormCard>
  )
}

export default AccountVerificationForm
