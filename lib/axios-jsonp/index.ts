import jsonpAdapter from 'axios-jsonp'
import { OrganizationInputs } from '@/interfaces/form/inputs'
import { getRequest } from '@/api'
import { ZIP_ADDRESS_API_URL } from './util'

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

const noData = {
  pref: '',
  city: '',
  town: '',
} as Address

export default async function fetchAddressByPostalCode(
  postalCode: OrganizationInputs['postal_code']
) {
  if (!!postalCode) {
    const address = await getRequest<AddressResponse>(
      `/?zipcode=${postalCode}`,
      undefined,
      undefined,
      ZIP_ADDRESS_API_URL
    )
      .then((res) => {
        const d = res.data
        return d === undefined ? noData : d
      })
      .catch(() => noData)
    return address
  }
  return noData
}
