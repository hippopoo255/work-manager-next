import React from 'react'
import clsx from 'clsx'

type Props = {
  featureId: string
  icon: any
  text: string
  zerofill: string
}

const TopLinedPaper = ({ featureId, icon, text, zerofill }: Props) => {
  return (
    <div className={'p-toplined-paper'}>
      <h4 className={clsx(['p-toplined-paper__title', featureId])}>
        <span>POINT</span>
        <span className="p-toplined-paper__title-index">{zerofill}</span>
        <div
          className={clsx(['p-toplined-paper__title-line', featureId])}
        ></div>
      </h4>
      <div className="p-toplined-paper__icon-wrap">{icon}</div>
      <p className="p-toplined-paper__body">{text}</p>
    </div>
  )
}

export default TopLinedPaper
