type DataValue =
  | string
  | number
  | boolean
  | JSX.Element
  | React.ReactNode
  | (string | number | boolean)[]

export interface TableRowData {
  id: number
  created_at: string
  [columnName: string]: DataValue
}
