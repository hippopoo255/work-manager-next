import React from 'react'
import { TwoToneSection } from '@/components/organisms/top'

const ChatSection = () => {
  const icons = ['point_chat01.svg', 'point_chat02.svg', 'point_chat03.svg']

  return <TwoToneSection pointIcons={icons} index={3} />
}

export default ChatSection
