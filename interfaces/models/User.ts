import { Schedule, MeetingRecord } from '.'
export interface User {
  readonly id: number
  given_name: string
  family_name: string
  daily_schedule: Schedule[]
  recent_meeting_records: MeetingRecord[]
  [k: string]: any
}
