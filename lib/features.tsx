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
import { BaseSection } from '@/components/organisms/top'
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
        <BaseSection index={0} icon={<MeetingRecordIcon fontSize={'48px'} />} />
      ),
      mission: '会議での意思決定を書き起こす',
      description:
        '開催した会議の日時、会議名、アジェンダ、参加者等を入力し、会議の議事録を保存します。\n保存した議事録のデータは、一覧形式であとから一覧でき、読み返すことができます。',
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
      description:
        '出張やミーティングの予定を他のユーザと共有できます。\n通知をオンにすると、当日のスケジュールを毎朝メールでリマインドします。',
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
        'タスクの入力フォームから優先度や締切日時を設定できます。\n通知をオンにすると、期日の迫ったタスクをメールでリマインドします。',
      mission: '仕事の優先度を決める',
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
      description:
        'テキスト以外に1回の投稿で4枚まで画像をアップロードできます。\nブラウザをリロードしなくても、メンバーの既読がリアルタイムで分かります。',
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
