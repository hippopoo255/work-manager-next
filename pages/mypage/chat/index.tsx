import React, { useState, useMemo, useEffect } from 'react'
import { ChatLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'

const Index = () => {
  const init = () => {}

  return (
    <ChatLayout
      supplyUserId={init}
      title="チャット"
      mainNone
      sideNone={false}
      activeRoom={null}
    >
      <div></div>
    </ChatLayout>
  )
}

export default Index
