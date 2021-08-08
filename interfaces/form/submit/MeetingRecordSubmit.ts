import { MeetingDecisionInputs } from '@/interfaces/form/inputs'

export interface MeetingRecordSubmit {
  recorded_by: number
  title: string
  summary: string
  place_id: number
  role_id: number | null
  meeting_date: string
  members: number[]
  meeting_decisions: MeetingDecisionInputs[]
}
