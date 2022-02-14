import { User, MeetingDecision, MeetingPlace } from './'

export interface MeetingRecord {
  readonly id: number
  title: string
  summary: string
  meeting_date: string
  created_by: User
  place: MeetingPlace
  decisions: MeetingDecision[]
  members: User[]
  created_at: string
  is_editable: boolean
  is_pin: boolean
  [k: string]: any
}
