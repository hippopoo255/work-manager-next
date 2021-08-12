import { MemberInputs } from '.'
export interface MemberExtInputs extends MemberInputs {
  // id: number
  // full_name: string
  is_editable: boolean
  shared_by: number
  [k: string]: string | boolean | number | undefined
}
