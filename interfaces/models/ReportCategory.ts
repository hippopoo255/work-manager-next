export interface ReportCategory {
  readonly id: number
  code: string
  name: string
  [k: string]: string | number
}
