export interface ChatMessageInputs {
  id?: number
  delete_flags: (number | null)[]
  previews: any[]
  body: string
  created_by: number
  image_ids?: (number | null)[]
}
