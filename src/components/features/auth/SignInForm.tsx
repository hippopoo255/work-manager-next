import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import DemoUserSuggestion from './DemoUserSuggestion'
import { SignInFields } from './SignInFields'
import { FormCard } from '~/components/elements/Form'

const SignInForm = () => {
  const { t } = useTranslation('form')
  return (
    <FormCard title={t('signIn.title') ?? ''} size="sm">
      <SignInFields />
      <div className="mt-16">
        <div className="grid place-content-between">
          {/* サポート...パスワードをお忘れですか？ 新規登録がお済みでない方はこちら */}
          <Link href="/password-forgotten" className="u-link mb-4">
            {t('link.passwordForgotten')}
          </Link>
          <Link href="/signup" className="u-link --secondary">
            {t('link.dontHaveAccount')}
          </Link>
        </div>
        <div className="mt-6 grid">
          <DemoUserSuggestion />
        </div>
      </div>
    </FormCard>
  )
}

export default SignInForm
