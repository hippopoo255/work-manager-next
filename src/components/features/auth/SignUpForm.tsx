import Link from 'next/link'
import DemoUserSuggestion from './DemoUserSuggestion'
import { SignUpFields } from './SignUpFields'
import { FormCard } from '~/components/elements/Form'

const Suggestion = () => {
  return (
    <>
      <div className="grid sm:grid-flow-col place-content-between">
        <Link href="/signin" className="u-link --primary">
          {'既にアカウントをお持ちの方'}
        </Link>
      </div>
      <div className="mt-6 grid">
        <DemoUserSuggestion />
      </div>
    </>
  )
}

const SignUpForm = () => {
  return (
    <FormCard title="アカウント登録">
      <SignUpFields />
      <div className="mt-16">
        <Suggestion />
      </div>
    </FormCard>
  )
}

export default SignUpForm
