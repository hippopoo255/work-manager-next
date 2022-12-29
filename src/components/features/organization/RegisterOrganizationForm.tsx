import { useTranslation } from 'next-i18next'
import { RegisterOrganizationFields } from './RegisterOrganizationFields'
import { FormCard } from '~/components/elements/Form'

const RegisterOrganizationForm = () => {
  const { t } = useTranslation('form')
  return (
    <FormCard title={t('organization.register.title') ?? ''}>
      <RegisterOrganizationFields />
    </FormCard>
  )
}

export default RegisterOrganizationForm
