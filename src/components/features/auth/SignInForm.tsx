import Link from 'next/link'
import DemoUserSuggestion from './DemoUserSuggestion'
import { SignInFields } from './SignInFields'
import { FormCard } from '~/components/elements/Form'

const Suggestion = () => {
  return (
    <>
      <div className="grid place-content-between">
        {/* サポート...パスワードをお忘れですか？ 新規登録がお済みでない方はこちら */}
        <Link href="/password-forgotten" className="u-text-link mb-4">
          {'パスワードをお忘れの方'}
        </Link>
        <Link href="/signup" className="u-text-link --secondary">
          {'アカウント登録がまだの方'}
        </Link>
      </div>
      <div className="mt-6 grid">
        <DemoUserSuggestion />
      </div>
    </>
  )
}

const SignInForm = () => {
  return (
    <FormCard title="サインイン" size="sm">
      <SignInFields />
      <div className="mt-16">
        <Suggestion />
      </div>
    </FormCard>
  )
}

export default SignInForm
