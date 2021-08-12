import { Inputs, MemberExtInputs, MeetingDecisionInputs } from '.'

export interface ChatRoomInputs
  extends Inputs<MemberExtInputs, MeetingDecisionInputs> {
  created_by: number
  name: string
  members: MemberExtInputs[]
}
