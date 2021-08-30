export interface HeadCell<T> {
  id: keyof T
  disablePadding: boolean
  label: string
  numeric: boolean
  align: 'right' | 'left' | 'center'
  size?: number
  long?: boolean
}
