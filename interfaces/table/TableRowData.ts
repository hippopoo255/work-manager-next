type DataValue =
  | string
  | number
  | boolean
  | JSX.Element
  | (string | number | boolean)[]

export interface TableRowData {
  id: number
  created_at: string
  [columnName: string]: DataValue
}
