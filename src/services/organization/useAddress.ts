import { AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { useEffect, useCallback, useState } from 'react'
import { SelectOptionList } from '~/components/elements/Form/types'
import { ZIP_ADDRESS_API_URL } from '~/config/app'
import { fetch } from '~/libs/http_clients/axios'
import { RegisterOrganizationForm, Prefecture } from '~/schema/generated/@types'
import { useFetch } from '~/services/common'
import { useStatus } from '~/services/status'
export type Address = {
  pref: string
  city: string
  town: string
  [k: string]: string
}

type AddressResponse = {
  code: number
  data?: Address
} & {
  message?: string
}

const useAddress = () => {
  const { t } = useTranslation('form')
  const [prefOptions, setPrefOptions] = useState<SelectOptionList>([
    {
      label: t('select.initial'),
      value: 0,
    },
  ])
  const { update: updateStatus } = useStatus()
  const { get, auth } = useFetch()

  useEffect(() => {
    if (auth.isSignedIn) {
      const init = async () => {
        await get<Prefecture[]>('/prefecture')
          .then((res) => {
            const options = res.data.map((pref) => ({
              label: pref.name,
              value: pref.id,
            }))
            setPrefOptions((prev) => [...prev, ...options])
          })
          .catch(({ data: errData }: AxiosResponse) => {
            updateStatus({
              message: errData.message,
              statusCode: errData.status,
              category: 'error',
            })
          })
      }
      init()
    }
  }, [auth])

  const prefIdFromPref = useCallback(
    (pref: string) => {
      const target = prefOptions.find((option) => option.label === pref)
      return target?.value ?? prefOptions[0].value
    },
    [prefOptions]
  )

  const exec = async (postalCode: RegisterOrganizationForm['postal_code']) => {
    if (postalCode === '') {
      return null
    }

    const address = await fetch<AddressResponse>(`/?zipcode=${postalCode}`, {
      baseURL: ZIP_ADDRESS_API_URL,
    }).then((res) => {
      const address = res.data.data
      return address
    })

    if (address) {
      return {
        prefId: prefIdFromPref(address.pref),
        city: address.city,
        town: address.town,
      }
    }

    return null
  }

  return {
    exec,
    prefOptions,
  }
}

export default useAddress
