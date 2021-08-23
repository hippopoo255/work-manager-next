export interface ChatMessageInputs {
  id?: number
  delete_flags: (number | null)[]
  previews: any[]
  body: string
  written_by: number
  image_ids?: (number | null)[]
}
