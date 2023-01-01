import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import DemoUserSuggestion from './DemoUserSuggestion'
import { SignUpFields } from './SignUpFields'
import { FormCard } from '~/components/elements/Form'

const SignUpForm = () => {
  const { t } = useTranslation()

  return (
    <FormCard title={t('signUp.title', { ns: 'form' }) ?? ''}>
      <SignUpFields />
      <div className="mt-8">
        <div className="grid sm:grid-flow-col place-content-between">
          <Link href="/signin" className="u-link --primary">
            {t('link.alreadyHaveAccount')}
          </Link>
        </div>
        <hr className="my-4 -mx-4" />
        <div className="grid">
          <DemoUserSuggestion flat />
        </div>
      </div>
    </FormCard>
  )
}

export default SignUpForm
