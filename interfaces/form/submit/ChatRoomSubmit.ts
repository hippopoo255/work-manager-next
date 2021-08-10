export interface ChatRoomSubmit {
  created_by: number
  name: string
  members: {
    [k: number]: {
      is_editable: boolean
      shared_by: number
    }
  }
}
