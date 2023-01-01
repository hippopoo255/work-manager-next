import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import DemoUserSuggestion from './DemoUserSuggestion'
import { SignInFields } from './SignInFields'
import { FormCard } from '~/components/elements/Form'

const SignInForm = () => {
  const { t } = useTranslation()
  return (
    <FormCard title={t('signIn.title', { ns: 'form' }) ?? ''} size="sm">
      <SignInFields />
      <div className="mt-8">
        <div className="grid place-content-between">
          {/* サポート...パスワードをお忘れですか？ 新規登録がお済みでない方はこちら */}
          <Link href="/password-forgotten" className="u-link">
            {t('link.passwordForgotten')}
          </Link>
          <Link href="/signup" className="u-link --secondary">
            {t('link.dontHaveAccount')}
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

export default SignInForm
