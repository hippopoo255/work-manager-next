export interface ChatMessageSubmit {
  written_by: number
  body: string
  mentioned_to?: number | null
}
