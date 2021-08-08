import { TableRowData, Order } from '.'

export interface QueryParam<T extends TableRowData> {
  sort_key: keyof T
  order_by: Order
  page: number
}
