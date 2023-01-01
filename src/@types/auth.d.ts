import { User, Admin } from '~/schema/generated/@types'

// const auth: Admin | User = {
//   id: 1,
//   full_name: '',
//   given_name: '',
//   given_name_kana: '',
//   family_name: '',
//   family_name_kana: '',
//   is_over: false,
// }
// if(assertUser(auth)) {
//   * auth: User
//   const user = auth // User
// }
export const assertUser = (auth): schema is User => {
  return auth instanceof User
}

// objectのキーをユニオン型に
type User = {
  id: number
  name: string
  email: string
}

type UserKey = keyof User // 'id' | 'name' | 'email'

type Admin = {
  [k in keyof User]: number | string
}
