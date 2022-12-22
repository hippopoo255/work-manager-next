'use client'

import React from 'react'
import { BorderButton } from '~/components/elements/Button'
import { useDemoUserSignIn } from '~/services/auth'

const DemoUserSuggestion = () => {
  const { loading, onSubmit } = useDemoUserSignIn()
  return (
    <BorderButton
      text="デモユーザとして試す"
      loading={loading}
      onClick={onSubmit}
    />
  )
}

export default DemoUserSuggestion
