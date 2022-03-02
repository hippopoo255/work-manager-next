import React from 'react'
import { TwoToneSection } from '@/components/organisms/top'
import TaskFeat01Icon from '@/assets/images/task_feat01.svg'
import TaskFeat02Icon from '@/assets/images/task_feat02.svg'
import TaskFeat03Icon from '@/assets/images/task_feat03.svg'

const TaskSection = () => {
  const icons = [
    <TaskFeat01Icon key="01" className={'p-toplined-paper__icon'} />,
    <TaskFeat02Icon key="02" className={'p-toplined-paper__icon'} />,
    <TaskFeat03Icon key="03" className={'p-toplined-paper__icon'} />,
  ]

  return <TwoToneSection pointIcons={icons} index={2} />
}

export default TaskSection
