import React from 'react'
import { TwoToneSection } from '@/components/organisms/top'

const ScheduleSection = () => {
  const icons = [
    'point_schedule01.svg',
    'point_schedule02.svg',
    'point_schedule03.svg',
  ]
  return <TwoToneSection pointIcons={icons} index={1} />
}

export default ScheduleSection
