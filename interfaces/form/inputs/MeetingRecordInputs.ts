import { Inputs, MemberInputs, MeetingDecisionInputs } from '.'

export interface MeetingRecordInputs
  extends Inputs<MemberInputs, MeetingDecisionInputs> {
  recorded_by: number
  title: string
  summary: string
  place_id: number
  role_id: number | null
  meeting_date: Date
  members: MemberInputs[]
  meeting_decisions: MeetingDecisionInputs[]
}
