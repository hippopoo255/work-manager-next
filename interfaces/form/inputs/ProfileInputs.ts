export interface ProfileInputs {
  family_name: string
  given_name: string
  family_name_kana: string
  given_name_kana: string
  change_password: boolean
  file: File | null
  delete_flag: boolean
  current_password?: string
  password?: string
  password_confirmation?: string
}
