import React from 'react'
import { TwoToneSection } from '@/components/organisms/top'

const TaskSection = () => {
  const icons = ['point_task01.svg', 'point_task02.svg', 'point_task03.svg']
  return <TwoToneSection pointIcons={icons} index={2} />
}

export default TaskSection
