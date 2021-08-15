import { Inputs, MemberExtInputs, MeetingDecisionInputs } from '.'

export interface ScheduleInputs
  extends Inputs<MemberExtInputs, MeetingDecisionInputs> {
  id?: number
  scheduled_by: number
  title: string
  memo: string
  start: Date
  end: Date
  is_public: boolean
  disabled: boolean
  color: string
  sharedMembers: MemberExtInputs[]
}
