import React from 'react'
import { SendPasswordForgottenFields } from './SendPasswordForgottenFields'
import { FormCard } from '~/components/elements/Form'

const SendPasswordForgottenForm = () => {
  return (
    <FormCard title={'パスワード再設定メールを送る'}>
      <SendPasswordForgottenFields />
    </FormCard>
  )
}

export default SendPasswordForgottenForm
