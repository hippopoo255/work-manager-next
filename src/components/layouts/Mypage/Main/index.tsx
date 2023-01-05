import React from 'react'
import { TMainTitle } from '../types'

type Props = {
  children: React.ReactNode
  title?: TMainTitle
}
const Main = ({ children, title }: Props) => {
  return (
    <div className="l-main">
      <h2 className="l-main__head">
        <div
          className={`u-container${
            title?.position ? ' --' + title?.position : ''
          }`}
        >
          <div className="p-page-title">{title?.text ?? ''}</div>
        </div>
      </h2>
      <div className="l-main__body">{children}</div>
    </div>
  )
}

export default Main
