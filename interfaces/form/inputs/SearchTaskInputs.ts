import { SearchInputs } from '.'

export interface SearchTaskInputs extends SearchInputs {
  progress_id: string
  priority_id: string
  status: string
}
