import { AccountVerificationInputs } from '.'
export interface ForgotPasswordResetInputs extends AccountVerificationInputs {
  password: string
}
