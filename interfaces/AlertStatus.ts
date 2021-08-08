export type AlertStatus = {
  severity: 'error' | 'warning' | 'info' | 'success'
  variant: 'filled' | 'outlined' | 'standard'
  msg: string
  show: boolean
}
