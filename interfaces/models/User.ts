import { Schedule, MeetingRecord } from '.'
export interface User {
  readonly id: number
  email: string
  family_name: string
  family_name_kana: string
  given_name: string
  given_name_kana: string
  daily_schedule: Schedule[]
  recent_meeting_records: MeetingRecord[]
  [k: string]: any
}
