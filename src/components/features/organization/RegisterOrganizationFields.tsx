import { BorderButton, Button } from '~/components/elements/Button'
import { TextField, SelectField, FormRow } from '~/components/elements/Form'
import { RegisterOrganizationForm } from '~/schema/organization/registerOrganizationValidator'
import { useRegisterOrganization, useAddress } from '~/services/organization'

export const RegisterOrganizationFields = () => {
  const { loading, onSubmit, FormProvider, methods } = useRegisterOrganization()
  const { exec, prefOptions } = useAddress()

  const handleAddress = async () => {
    await exec(methods.getValues('postal_code')).then((result) => {
      if (result) {
        methods.setValue('pref_id', result.prefId)
        methods.setValue('city', result.city)
        methods.setValue('address', result.town)
      }
    })
  }

  return (
    <FormProvider {...methods}>
      <FormRow>
        <TextField<RegisterOrganizationForm>
          label={'組織名*'}
          fieldName="name"
          autoFocus
        />
      </FormRow>
      <FormRow>
        <TextField<RegisterOrganizationForm>
          fieldName="name_kana"
          label={'組織名(カナ)*'}
        />
      </FormRow>
      <FormRow className="flex gap-2">
        <div className="w-full flex-grow">
          <TextField<RegisterOrganizationForm>
            fieldName="postal_code"
            label={'郵便番号*'}
          />
        </div>
        <div className="shrink-0">
          <BorderButton
            text="住所を自動入力する"
            color={'secondary'}
            onClick={handleAddress}
            flat
          />
        </div>
      </FormRow>
      <FormRow className="flex gap-2">
        <div className="w-full flex-grow">
          <SelectField<RegisterOrganizationForm>
            fieldName="pref_id"
            label={'都道府県*'}
            options={prefOptions}
          />
        </div>
        <div className="w-full flex-grow">
          <TextField<RegisterOrganizationForm>
            fieldName="city"
            label={'市区町村*'}
          />
        </div>
      </FormRow>
      <FormRow>
        <TextField<RegisterOrganizationForm>
          fieldName="address"
          label={'以降の住所*'}
        />
      </FormRow>
      <FormRow>
        <TextField<RegisterOrganizationForm>
          fieldName="tel"
          label={'電話番号*'}
        />
      </FormRow>
      <FormRow>
        <TextField<RegisterOrganizationForm>
          fieldName="password"
          type="password"
          label={'管理システム用アカウントのパスワード*'}
        />
      </FormRow>
      <FormRow className="grid">
        <Button
          text="登録"
          loading={loading}
          onClick={methods.handleSubmit(onSubmit)}
          className={'--signup'}
        />
      </FormRow>
    </FormProvider>
  )
}
