import { User } from '.'
export interface Organization {
  readonly id: number
  name: string
  name_kana: string
  postal_code: string
  pref_id: number
  city: string
  address: string
  tel: string
  supervisor: User
  [k: string]: any
}
