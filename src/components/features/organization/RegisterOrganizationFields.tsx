import { useTranslation } from 'next-i18next'
import { BorderButton, Button } from '~/components/elements/Button'
import { TextField, SelectField, FormRow } from '~/components/elements/Form'
import { RegisterOrganizationForm } from '~/schema/organization/registerOrganizationValidator'
import { useRegisterOrganization, useAddress } from '~/services/organization'

export const RegisterOrganizationFields = () => {
  const { loading, onSubmit, FormProvider, methods } = useRegisterOrganization()
  const { exec, prefOptions } = useAddress()
  const { t } = useTranslation()

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
          label={`${t('organization.register.attributes.name', {
            ns: 'form',
          })}*`}
          fieldName="name"
          autoFocus
        />
      </FormRow>
      <FormRow>
        <TextField<RegisterOrganizationForm>
          fieldName="name_kana"
          label={`${t('organization.register.attributes.name_kana', {
            ns: 'form',
          })}*`}
        />
      </FormRow>
      <FormRow className="flex gap-2">
        <div className="w-full flex-grow">
          <TextField<RegisterOrganizationForm>
            fieldName="postal_code"
            label={`${t('organization.register.attributes.postal_code', {
              ns: 'form',
            })}*`}
          />
        </div>
        <div className="shrink-0">
          <BorderButton
            text={t('label.addressAuto', { ns: 'common' })}
            color={'secondary'}
            onClick={handleAddress}
            size={'sm'}
            flat
          />
        </div>
      </FormRow>
      <FormRow className="flex gap-2">
        <div className="w-full flex-grow">
          <SelectField<RegisterOrganizationForm>
            fieldName="pref_id"
            label={`${t('organization.register.attributes.pref_id', {
              ns: 'form',
            })}*`}
            options={prefOptions}
          />
        </div>
        <div className="w-full flex-grow">
          <TextField<RegisterOrganizationForm>
            fieldName="city"
            label={`${t('organization.register.attributes.city', {
              ns: 'form',
            })}*`}
          />
        </div>
      </FormRow>
      <FormRow>
        <TextField<RegisterOrganizationForm>
          fieldName="address"
          label={`${t('organization.register.attributes.address', {
            ns: 'form',
          })}*`}
        />
      </FormRow>
      <FormRow>
        <TextField<RegisterOrganizationForm>
          fieldName="tel"
          type="tel"
          label={`${t('organization.register.attributes.tel', {
            ns: 'form',
          })}*`}
        />
      </FormRow>
      <FormRow>
        <TextField<RegisterOrganizationForm>
          fieldName="password"
          type="password"
          label={`${t('organization.register.attributes.password', {
            ns: 'form',
          })}*`}
        />
      </FormRow>
      <FormRow className="grid">
        <Button
          text={`${t('organization.register.submit', {
            ns: 'form',
          })}`}
          loading={loading}
          onClick={methods.handleSubmit(onSubmit)}
          className={'--signup'}
        />
      </FormRow>
    </FormProvider>
  )
}
