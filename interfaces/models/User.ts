export interface User {
  readonly id: number
  given_name: string
  family_name: string
  [k: string]: any
}
