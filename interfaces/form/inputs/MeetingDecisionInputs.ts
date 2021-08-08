import { ProcessFlag } from '@/interfaces/enums/ProcessFlag'

export interface MeetingDecisionInputs {
  id?: number
  flag?: ProcessFlag
  subject: string
  body: string
  written_by: number
  decided_by: null | number
}
