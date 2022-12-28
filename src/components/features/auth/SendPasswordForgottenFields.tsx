import React from 'react'
import { Button } from '~/components/elements/Button'
import { TextField, FormRow } from '~/components/elements/Form'
import { SendPasswordForgottenFormType as FormType } from '~/schema/auth/sendPasswordForgottenValidation'
import { useSendPasswordForgotten } from '~/services/auth'

export const SendPasswordForgottenFields = () => {
  const { loading, onSubmit, FormProvider, methods } =
    useSendPasswordForgotten()

  return (
    <FormProvider {...methods}>
      <form>
        <FormRow>
          <TextField<FormType>
            label={'ユーザIDまたはメールアドレス*'}
            fieldName="user_id"
            autoFocus
          />
        </FormRow>
        <FormRow className="grid">
          <Button
            text="送信"
            loading={loading}
            onClick={methods.handleSubmit(onSubmit)}
          />
        </FormRow>
      </form>
    </FormProvider>
  )
}