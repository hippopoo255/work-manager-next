export interface HeadCell<T> {
  disablePadding: boolean
  id: keyof T
  label: string
  numeric: boolean
  align: 'right' | 'left' | 'center'
  size?: number
  long?: boolean
}
