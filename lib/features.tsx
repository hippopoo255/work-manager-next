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
import { BaseSection, MinutesSection } from '@/components/organisms/top'
import router from 'next/router'

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
        '追加フォームからステップに沿って入力',
        '絞り込み機能で一覧の中から自分が参加した会議のみを表示できる',
        '議事録を新規追加すると、参加メンバーにメールでアラート',
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
        <BaseSection index={1} icon={<ScheduleIcon fontSize={'48px'} />} />
      ),
      mission: 'スケジュールを立てる',
      points: [
        '他のユーザーとスケジュールを共有できる',
        '共有相手の編集権限や、共有していないユーザーに対する公開設定ができる',
        '当日のスケジュールを毎朝メールでアラート',
      ],
      description:
        '出張やミーティングの予定を他のユーザと共有できます。\nスケジュールはドラッグアンドドロップで変更でき、リスケも手軽に行えます。',
      icon: <ScheduleIcon fontSize={'28px'} />,
    },
    {
      id: 'task',
      to: '#task',
      name: t.feature.task,
      text: t.application.task,
      component: (
        <BaseSection index={2} icon={<TaskIcon fontSize={'48px'} />} />
      ),
      description:
        '入力フォームから優先度や締切日時を設定するため、緊急性と重要性の二軸でタスクを管理できます。\nメール通知をオンにすると、期日の迫ったタスクの漏れを防止できます。',
      mission: '仕事の優先度を決める',
      points: [
        '優先度や締切日時を設定できる',
        '期限の迫ったタスクに絞り込んで一覧表示',
        '締切が翌日に迫ったタスクを前日にメールでアラート',
      ],
      icon: <TaskIcon fontSize={'28px'} />,
    },
    {
      id: 'chat',
      to: '#chat',
      name: t.feature.chat,
      text: t.application.chat,
      component: (
        <BaseSection index={3} icon={<ChatIcon fontSize={'48px'} />} />
      ),
      mission: 'テキストベースで会話する',
      points: [
        'チャットによるコミュニケーションができる',
        '1回あたり4枚まで画像の送信ができる',
        'ブラウザをリロードしなくても、新着メッセージやメンバーの既読が確認できる',
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
