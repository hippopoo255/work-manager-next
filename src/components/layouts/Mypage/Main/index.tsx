import React from 'react'

type Props = {
  children: React.ReactNode
  title?: string
}
const Main = ({ children, title }: Props) => {
  return (
    <div className="l-main">
      <h2 className="l-main__head">
        <div className="u-container">
          <div className="p-page-title">{title ?? ''}</div>
        </div>
      </h2>
      <div className="l-main__body">{children}</div>
    </div>
  )
}

export default Main
