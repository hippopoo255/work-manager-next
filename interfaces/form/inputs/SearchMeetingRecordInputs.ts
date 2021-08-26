interface Parent {
  [k: string]: string
}
export interface SearchMeetingRecordInputs extends Parent {
  keyword: string
  count: string // 6,10 -> min: 6 max: 10
  meeting_date: string
}
