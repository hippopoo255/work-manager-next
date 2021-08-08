import { User, Role } from '.'
export interface DocumentFolder {
  readonly id: number
  created_by: User
  name: string
  role: Role
  created_at: string
  [k: string]: any
}
