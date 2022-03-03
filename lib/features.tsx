import { useLocale } from '@/hooks'
import {
  ChatIcon,
  ScheduleIcon,
  TaskIcon,
  MeetingRecordIcon,
} from '@/components/atoms/icons'

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
      name: t.feature.minutes.name,
      text: t.feature.minutes.linkText,
      mission: t.feature.minutes.mission,
      points: t.feature.minutes.points,
      description: t.feature.minutes.description,
      icon: <MeetingRecordIcon fontSize={'28px'} />,
    },
    {
      id: 'schedule',
      to: '#schedule',
      name: t.feature.schedule.name,
      text: t.feature.schedule.linkText,
      mission: t.feature.schedule.mission,
      points: t.feature.schedule.points,
      description: t.feature.schedule.description,
      icon: <ScheduleIcon fontSize={'28px'} />,
    },
    {
      id: 'task',
      to: '#task',
      name: t.feature.task.name,
      text: t.feature.task.linkText,
      mission: t.feature.task.mission,
      points: t.feature.task.points,
      description: t.feature.task.description,

      icon: <TaskIcon fontSize={'28px'} />,
    },
    {
      id: 'chat',
      to: '#chat',
      name: t.feature.chat.name,
      text: t.feature.chat.linkText,
      mission: t.feature.chat.mission,
      points: t.feature.chat.points,
      description: t.feature.chat.description,
      icon: <ChatIcon fontSize={'28px'} />,
    },
  ]
}

export default Features
