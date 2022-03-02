import React from 'react'
import { TwoToneSection } from '@/components/organisms/top'
import ChatFeat01Icon from '@/assets/images/chat_feat01.svg'
import ChatFeat02Icon from '@/assets/images/chat_feat02.svg'
import ChatFeat03Icon from '@/assets/images/chat_feat03.svg'

type Props = {
  index: number
  icon: JSX.Element
}

const ChatSection = () => {
  const icons = [
    <ChatFeat01Icon key="01" className={'p-toplined-paper__icon'} />,
    <ChatFeat02Icon key="02" className={'p-toplined-paper__icon'} />,
    <ChatFeat03Icon key="03" className={'p-toplined-paper__icon'} />,
  ]

  return <TwoToneSection pointIcons={icons} index={3} />
}

export default ChatSection
