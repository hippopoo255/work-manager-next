import { NotifyStatus } from '@/interfaces/common'
import { PasswordResetInputs } from '.'
export interface SettingInputs {
  notify_validation: {
    [k: string]: boolean
  }
  change_password: PasswordResetInputs
  // current_password?: string
  // password?: string
  // password_confirmation?: string
}
