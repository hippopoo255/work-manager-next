export interface SettingSubmit extends FormData {
  change_password: '1' | '0' | 1 | 0 | boolean
  current_password?: string
  password?: string
  password_confirmation?: string
}
