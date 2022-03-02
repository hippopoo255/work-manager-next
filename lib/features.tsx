import { useLocale } from '@/hooks'
import {
  ChatIcon,
  ScheduleIcon,
  TaskIcon,
  MeetingRecordIcon,
} from '@/components/atoms/icons'
import { featuresIcon } from '@/assets/images'

export type FeatureItem = {
  id: string
  to: string
  name: string
  text: string
  description: string
  icon?: JSX.Element
  handleClick?: Function
  mission: string
  points: { text: string; icon: any }[]
}

const Features = () => {
  const { t } = useLocale()
  return [
    {
      id: 'minutes',
      to: '#minutes',
      name: t.feature.meetingRecord,
      text: t.application.meetingRecord,
      mission: '会議の決定事項を記録する',
      points: [
        {
          text: '入力フォームから議事録を作成し、会議の決議事項を記録できます。',
          icon: featuresIcon.minutes[0],
        },
        {
          text: '過去の議事録をオンラインで確認でき、自分の参加した会議のみを表示させたり、ブックマークに追加したりできます。',
          icon: featuresIcon.minutes[1],
        },
        {
          text: '議事録を新規で追加すると、通知をオンにしている参加メンバーにはメールが届きます。',
          icon: featuresIcon.minutes[2],
        },
      ],
      description:
        '会議で決まったことを定期的に振り返り、プロジェクトの進行状況をスムーズに把握することができます。\n議事録をオンラインで管理したい方はぜひお試しください。',
      icon: <MeetingRecordIcon fontSize={'28px'} />,
    },
    {
      id: 'schedule',
      to: '#schedule',
      name: t.feature.schedule,
      text: t.application.schedule,
      mission: 'スケジュールを立てる',
      points: [
        {
          text: '他のユーザーとスケジュールを共有できます。',
          icon: featuresIcon.schedule[0],
        },
        {
          text: '共有相手の編集権限や、共有していないユーザーに対する公開設定などのオプションを設定できます。',
          icon: featuresIcon.schedule[1],
        },
        {
          text: '当日のスケジュールを毎朝メールで通知します。',
          icon: featuresIcon.schedule[2],
        },
      ],
      description:
        '出張やミーティングの予定を他のユーザーと共有できます。\nスケジュールはドラッグアンドドロップで変更でき、リスケも手軽に行えます。',
      icon: <ScheduleIcon fontSize={'28px'} />,
    },
    {
      id: 'task',
      to: '#task',
      name: t.feature.task,
      text: t.application.task,
      description:
        '入力フォームに「優先度」や「締切日時」を指定することで、緊急性と重要性の2軸からタスクを管理できます。\nメール通知をオンにすると、期日の迫ったタスクの漏れを防止できます。',
      mission: '仕事の優先度を決める',
      points: [
        {
          text: '優先度や締切日時を設定できます。',
          icon: featuresIcon.task[0],
        },
        {
          text: 'ステータスを更新して進捗状況を管理できます。',
          icon: featuresIcon.task[1],
        },
        {
          text: '期限が翌日に迫ったタスクは前日にメールでアラートされます。',
          icon: featuresIcon.task[2],
        },
      ],
      icon: <TaskIcon fontSize={'28px'} />,
    },
    {
      id: 'chat',
      to: '#chat',
      name: t.feature.chat,
      text: t.application.chat,
      mission: 'テキストベースで会話する',
      points: [
        {
          text: 'チャットによるコミュニケーションができます。',
          icon: featuresIcon.chat[0],
        },
        {
          text: '投稿1回につき4枚まで画像の送信ができます。',
          icon: featuresIcon.chat[1],
        },
        {
          text: 'ブラウザをリロードしなくても、新着メッセージやメンバーの既読が確認できます。',
          icon: featuresIcon.chat[2],
        },
      ],
      description:
        '業務報告や相談等の専用ルームを作成し、テレワークの環境でも円滑なコミュニケーションができます。\n\nテキストでのチャットはもちろん、1回のメッセージで最大4枚まで画像をアップロードできます。',
      icon: <ChatIcon fontSize={'28px'} />,
    },
  ]
}

export default Features
