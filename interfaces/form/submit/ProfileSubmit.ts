export interface ProfileSubmit {
  family_name: string
  given_name: string
  family_name_kana: string
  given_name_kana: string
  file?: File | null
  delete_flag: '1' | '0' | 1 | 0 | boolean
  change_password: '1' | '0' | 1 | 0 | boolean
  current_password?: string
  password?: string
  password_confirmation?: string
}
