import { User, MeetingDecision, MeetingPlace } from './'

export interface MeetingRecord {
  readonly id: number
  title: string
  summary: string
  meeting_date: string
  recorded_by: User
  place: MeetingPlace
  decisions: MeetingDecision[]
  members: User[]
  created_at: string
  [k: string]: any
}