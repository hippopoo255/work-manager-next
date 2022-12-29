import { useTranslation } from 'next-i18next'
import { AccountVerificationFields } from './AccountVerificationFields'
import { FormCard } from '~/components/elements/Form'

const AccountVerificationForm = () => {
  const { t } = useTranslation('form')
  return (
    <FormCard title={t('verifyAccount.title') ?? ''}>
      <AccountVerificationFields />
    </FormCard>
  )
}

export default AccountVerificationForm
