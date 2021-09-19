import { SearchInputs } from '.'

export interface SearchMeetingRecordInputs extends SearchInputs {
  keyword: string
  count: string // 6,10 -> min: 6 max: 10
  meeting_date: string
  only_me: boolean | string
  only_bookmark: boolean | string
}
