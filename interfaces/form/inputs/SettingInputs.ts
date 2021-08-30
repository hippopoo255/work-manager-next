import { NotifyStatus } from '@/interfaces/common'

export interface SettingInputs {
  notify_validation: {
    [k: string]: boolean
  }
  change_password: boolean
  current_password?: string
  password?: string
  password_confirmation?: string
}
