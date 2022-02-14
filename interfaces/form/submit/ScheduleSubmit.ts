export interface ScheduleSubmit {
  created_by: number
  title: string
  memo: string
  start: string
  end: string
  is_public: boolean
  color: string
  sharedMembers: {
    [k: number]: {
      is_editable: boolean
      shared_by: number
    }
  }
}
