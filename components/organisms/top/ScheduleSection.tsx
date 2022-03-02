import React from 'react'
import { TwoToneSection } from '@/components/organisms/top'
import ScheduleFeat01Icon from '@/assets/images/schedule_feat01.svg'
import ScheduleFeat02Icon from '@/assets/images/schedule_feat02.svg'
import ScheduleFeat03Icon from '@/assets/images/schedule_feat03.svg'

const ScheduleSection = () => {
  const icons = [
    <ScheduleFeat01Icon key="01" className={'p-toplined-paper__icon'} />,
    <ScheduleFeat02Icon key="02" className={'p-toplined-paper__icon'} />,
    <ScheduleFeat03Icon key="03" className={'p-toplined-paper__icon'} />,
  ]
  return <TwoToneSection pointIcons={icons} index={1} />
}

export default ScheduleSection
