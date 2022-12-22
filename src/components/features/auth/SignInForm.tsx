'use client'

import Link from 'next/link'
import DemoUserSuggestion from './DemoUserSuggestion'
import { SignInFields } from './SignInFields'

const SignInForm = () => {
  return (
    <div className="p-card --space-lg">
      <div className="p-form">
        <h3 className="p-form__head">サインイン</h3>
        <div className="p-form__body">
          <SignInFields />
          <div className="mt-16">
            <div className="grid sm:grid-flow-col place-content-between">
              {/* サポート...パスワードをお忘れですか？ 新規登録がお済みでない方はこちら */}
              <Link href="/forgot-password" className="u-text-link">
                {'パスワードをお忘れの方はこちら'}
              </Link>
              <Link href="/signup" className="u-text-link --secondary">
                {'新規登録がお済みでない方はこちら'}
              </Link>
            </div>
            <div className="mt-8 grid">
              <DemoUserSuggestion />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInForm
