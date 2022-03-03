import React from 'react'
import clsx from 'clsx'
import { STORAGE_URL } from '@/lib/util'
type Props = {
  featureId: string
  iconPath: string
  text: string
  zerofill: string
}

const TopLinedPaper = ({ featureId, iconPath, text, zerofill }: Props) => {
  const bgImage = {
    backgroundImage: `url('${STORAGE_URL}/assets/${iconPath}')`,
  }
  return (
    <div className={'p-toplined-paper'}>
      <h4 className={clsx(['p-toplined-paper__title', featureId])}>
        <span>POINT</span>
        <span className="p-toplined-paper__title-index">{zerofill}</span>
        <div
          className={clsx(['p-toplined-paper__title-line', featureId])}
        ></div>
      </h4>

      <div className="p-toplined-paper__icon" style={bgImage}></div>
      <p className="p-toplined-paper__body">{text}</p>
    </div>
  )
}

export default TopLinedPaper
