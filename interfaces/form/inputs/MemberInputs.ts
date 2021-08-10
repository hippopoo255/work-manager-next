export interface MemberInputs {
  id: number
  full_name: string
  is_editable?: boolean
  [k: string]: string | boolean | number | undefined
}
