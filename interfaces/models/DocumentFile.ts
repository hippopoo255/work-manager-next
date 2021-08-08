import { User } from '.'
export interface DocumentFile {
  readonly id: number
  uploaded_by: User
  file_path: string
  shared_members: User[]
  created_at: string
  [k: string]: any
}
