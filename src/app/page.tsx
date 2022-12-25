'use client'

import React from 'react'
import { BorderButton, Button } from '~/components/elements/Button'
import { Tooltip } from '~/components/elements/Tooltip'

const Home = () => {
  return (
    <div className="p-page">
      <div className="p-card mx-4">
        <div className="flex justify-center">
          <Tooltip text="この操作は無効です">
            <span className="text-disabled">Tooltip</span>
          </Tooltip>
        </div>
      </div>
      <div className="p-card mx-4 mt-4">
        <h3>Button</h3>
        <div className="p-card__grid">
          <div className=""></div>
          <div className="text-center">Natural</div>
          <div className="text-center">light</div>
          <div className="text-center">Default</div>
          <div className="text-center">Dark</div>
          <div className="">Primary</div>
          <Button text="サインイン" className={'--primary-natural'} />
          <Button text="サインイン" className={'--primary-light'} />
          <Button text="サインイン" />
          <Button text="サインイン" className={'--primary-dark'} />
          <div>Secondary</div>
          <Button text="サインイン" className={'--secondary-natural'} />
          <Button text="サインイン" className={'--secondary-light'} />
          <Button text="サインイン" className={'--secondary'} />
          <Button text="サインイン" className={'--secondary-dark'} />
          <div>Disabled</div>
          <Button text="サインイン" className={'--disabled-natural'} />
          <Button text="サインイン" className={'--disabled-light'} />
          <Button text="サインイン" className={'--disabled'} />
          <Button text="サインイン" className={'--disabled-dark'} />
          <div>Success</div>
          <Button text="サインイン" className={'--success-natural'} />
          <Button text="サインイン" className={'--success-light'} />
          <Button text="サインイン" className={'--success'} />
          <Button text="サインイン" className={'--success-dark'} />
          <div>Warning</div>
          <Button text="サインイン" className={'--warning-natural'} />
          <Button text="サインイン" className={'--warning-light'} />
          <Button text="サインイン" className={'--warning'} />
          <Button text="サインイン" className={'--warning-dark'} />
          <div>Danger</div>
          <Button text="サインイン" className={'--danger-natural'} />
          <Button text="サインイン" className={'--danger-light'} />
          <Button text="サインイン" className={'--danger'} />
          <Button text="サインイン" className={'--danger-dark'} />
          <div>Minutes</div>
          <Button text="サインイン" className={'--minutes-natural'} />
          <Button text="サインイン" className={'--minutes-light'} />
          <Button text="サインイン" className={'--minutes'} />
          <Button text="サインイン" className={'--minutes-dark'} />
          <div>Task</div>
          <Button text="サインイン" className={'--task-natural'} />
          <Button text="サインイン" className={'--task-light'} />
          <Button text="サインイン" className={'--task'} />
          <Button text="サインイン" className={'--task-dark'} />
          <div>Schedule</div>
          <Button text="サインイン" className={'--schedule-natural'} />
          <Button text="サインイン" className={'--schedule-light'} />
          <Button text="サインイン" className={'--schedule'} />
          <Button text="サインイン" className={'--schedule-dark'} />
          <div>Chat</div>
          <Button text="サインイン" className={'--chat-natural'} />
          <Button text="サインイン" className={'--chat-light'} />
          <Button text="サインイン" className={'--chat'} />
          <Button text="サインイン" className={'--chat-dark'} />
          <div>Size</div>
          <Button text="エックスエス" className={'--chat-dark --xs'} />
          <Button text="エスエム" className={'--chat-dark --sm'} />
          <Button text="デフォルト" className={'--chat-dark'} />
          <Button text="ラージ" className={'--chat-dark --lg'} />
          <Button text="エックスラージ" className={'--chat-dark --xl'} />
          <Button
            text="エックスラージ"
            className={'--chat-dark --xl'}
            loading
          />
        </div>
      </div>
      <div className="p-card mx-4 mt-4">
        <div className="flex justify-center">
          <Tooltip text="この操作は無効です">
            <span className="text-disabled">Tooltip</span>
          </Tooltip>
        </div>
      </div>
      <div className="p-card mx-4 mt-4">
        <h3>BorderButton</h3>
        <div className="grid grid-cols-5 gap-x-2 gap-y-4">
          <div className=""></div>
          <div className="text-center">Natural</div>
          <div className="text-center">light</div>
          <div className="text-center">Default</div>
          <div className="text-center">Dark</div>
          <div className="">Primary</div>
          <BorderButton text="サインイン" className={'--primary-natural'} />
          <BorderButton text="サインイン" className={'--primary-light'} />
          <BorderButton text="サインイン" />
          <BorderButton text="サインイン" className={'--primary-dark'} />
          {/* <BorderButton text="サインイン" className={'--primary-dark --round'} /> */}
          <div>Secondary</div>
          <BorderButton text="サインイン" className={'--secondary-natural'} />
          <BorderButton text="サインイン" className={'--secondary-light'} />
          <BorderButton text="サインイン" className={'--secondary'} />
          <BorderButton text="サインイン" className={'--secondary-dark'} />
          <div>Disabled</div>
          <BorderButton text="サインイン" className={'--disabled-natural'} />
          <BorderButton text="サインイン" className={'--disabled-light'} />
          <BorderButton text="サインイン" className={'--disabled'} />
          <BorderButton text="サインイン" className={'--disabled-dark'} />
          <div>Success</div>
          <BorderButton text="サインイン" className={'--success-natural'} />
          <BorderButton text="サインイン" className={'--success-light'} />
          <BorderButton text="サインイン" className={'--success'} />
          <BorderButton text="サインイン" className={'--success-dark'} />
          <div>Warning</div>
          <BorderButton text="サインイン" className={'--warning-natural'} />
          <BorderButton text="サインイン" className={'--warning-light'} />
          <BorderButton text="サインイン" className={'--warning'} />
          <BorderButton text="サインイン" className={'--warning-dark'} />
          <div>Danger</div>
          <BorderButton text="サインイン" className={'--danger-natural'} />
          <BorderButton text="サインイン" className={'--danger-light'} />
          <BorderButton text="サインイン" className={'--danger'} />
          <BorderButton text="サインイン" className={'--danger-dark'} />
          <div>Minutes</div>
          <BorderButton text="サインイン" className={'--minutes-natural'} />
          <BorderButton text="サインイン" className={'--minutes-light'} />
          <BorderButton text="サインイン" className={'--minutes'} />
          <BorderButton text="サインイン" className={'--minutes-dark'} />
          <div>Task</div>
          <BorderButton text="サインイン" className={'--task-natural'} />
          <BorderButton text="サインイン" className={'--task-light'} />
          <BorderButton text="サインイン" className={'--task'} />
          <BorderButton text="サインイン" className={'--task-dark'} />
          <div>Schedule</div>
          <BorderButton text="サインイン" className={'--schedule-natural'} />
          <BorderButton text="サインイン" className={'--schedule-light'} />
          <BorderButton text="サインイン" className={'--schedule'} />
          <BorderButton text="サインイン" className={'--schedule-dark'} />
          <div>Chat</div>
          <BorderButton text="サインイン" className={'--chat-natural'} />
          <BorderButton text="サインイン" className={'--chat-light'} />
          <BorderButton text="サインイン" className={'--chat'} />
          <BorderButton text="サインイン" className={'--chat-dark'} />
          <BorderButton text="サインイン" className={'--chat'} loading />
        </div>
      </div>
    </div>
  )
}

export default Home
