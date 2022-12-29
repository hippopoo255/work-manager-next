import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import DemoUserSuggestion from './DemoUserSuggestion'
import { SignUpFields } from './SignUpFields'
import { FormCard } from '~/components/elements/Form'

const SignUpForm = () => {
  const { t } = useTranslation('form')

  return (
    <FormCard title={t('signUp.title') ?? ''}>
      <SignUpFields />
      <div className="mt-16">
        <div className="grid sm:grid-flow-col place-content-between">
          <Link href="/signin" className="u-link --primary">
            {t('link.alreadyHaveAccount')}
          </Link>
        </div>
        <div className="mt-6 grid">
          <DemoUserSuggestion />
        </div>
      </div>
    </FormCard>
  )
}

export default SignUpForm
