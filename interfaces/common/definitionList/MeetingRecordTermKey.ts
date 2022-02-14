import { DefinitionTermKey } from '.'

export interface MeetingRecordTermKey extends DefinitionTermKey {
  created_by: '記録者'
  title: '会議名'
  meeting_date: '開催日時'
  place: '開催場所'
  summary: '議題'
  members: '参加者'
  decisions: '決定事項'
}
