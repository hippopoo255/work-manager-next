import { ja, en } from '@/locales'
import { useLocale } from '@/hooks'
import {
  ChatIcon,
  ScheduleIcon,
  TaskIcon,
  LoginIcon,
  SignupIcon,
  MeetingRecordIcon,
} from '@/components/atoms/icons'
import {
  BaseSection,
  MinutesSection,
  ScheduleSection,
  TaskSection,
  ChatSection,
} from '@/components/organisms/top'
import router from 'next/router'
import { featuresIcon } from '@/assets/images'

export type FeatureItem = {
  id: string
  to: string
  name: string
  text: string
  description: string
  icon?: JSX.Element
  handleClick?: Function
  component?: JSX.Element
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
      component: (
        <MinutesSection
          index={0}
          icon={<MeetingRecordIcon fontSize={'48px'} />}
        />
      ),
      mission: '会議の決定事項を記録する',
      points: [
        {
          text: '追加フォームからステップに沿って入力',
          icon: featuresIcon.minutes[0],
        },
        {
          text: '絞り込み機能で一覧の中から自分が参加した会議のみを表示できる',
          icon: featuresIcon.minutes[1],
        },
        {
          text: '議事録を新規追加すると、参加メンバーにメールでアラート',
          icon: featuresIcon.minutes[2],
        },
      ],
      description:
        '開催した会議の日時、会議名、アジェンダ、参加者等を入力し、会議の議事録を保存できます。\n決定事項を記録しておくことで定期的に振り返ることができます。',
      icon: <MeetingRecordIcon fontSize={'28px'} />,
    },
    {
      id: 'schedule',
      to: '#schedule',
      name: t.feature.schedule,
      text: t.application.schedule,
      component: (
        <ScheduleSection index={1} icon={<ScheduleIcon fontSize={'48px'} />} />
      ),
      mission: 'スケジュールを立てる',
      points: [
        {
          text: '他のユーザーとスケジュールを共有できる',
          icon: featuresIcon.schedule[0],
        },
        {
          text: '共有相手の編集権限や、共有していないユーザーに対する公開設定ができる',
          icon: featuresIcon.schedule[1],
        },
        {
          text: '当日のスケジュールを毎朝メールでアラート',
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
      component: (
        <TaskSection index={2} icon={<TaskIcon fontSize={'48px'} />} />
      ),
      description:
        '緊急性と重要性の二軸からタスクを管理できるよう、入力フォームに「優先度」や「締切日時」を設定できます。\nメール通知をオンにすると、期日の迫ったタスクの漏れを防止できます。',
      mission: '仕事の優先度を決める',
      points: [
        { text: '優先度や締切日時を設定できる', icon: featuresIcon.task[0] },
        {
          text: 'ステータスを更新して進捗状況を管理できる',
          icon: featuresIcon.task[1],
        },
        {
          text: '期限が翌日に迫ったタスクを前日にメールでアラート',
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
      component: (
        <ChatSection index={3} icon={<ChatIcon fontSize={'48px'} />} />
      ),
      mission: 'テキストベースで会話する',
      points: [
        {
          text: 'チャットによるコミュニケーションができる',
          icon: featuresIcon.chat[0],
        },
        {
          text: '1回あたり4枚まで画像の送信ができる',
          icon: featuresIcon.chat[1],
        },
        {
          text: 'ブラウザをリロードしなくても、新着メッセージやメンバーの既読が確認できる',
          icon: featuresIcon.chat[2],
        },
      ],
      description:
        '業務報告や相談等の専用ルームを作成し、テレワークの環境でも円滑なコミュニケーションができます。\n\nテキストでのチャットはもちろん、1回のメッセージで最大4枚まで画像をアップロードできます。',
      icon: <ChatIcon fontSize={'28px'} />,
    },
    {
      id: 'login',
      to: '/login',
      name: t.head.title.login,
      text: t.head.title.login,
      handleClick: (item: FeatureItem) => {
        router.push(item.to)
      },
      icon: <LoginIcon fontSize={'28px'} />,
    },
    {
      id: 'signup',
      to: '/signup',
      name: t.head.title.signup,
      text: t.head.title.signup,
      handleClick: (item: FeatureItem) => {
        router.push(item.to)
      },
      icon: <SignupIcon fontSize={'28px'} />,
    },
  ]
}

export default Features
