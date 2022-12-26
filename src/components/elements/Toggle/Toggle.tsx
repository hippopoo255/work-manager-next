import clsx from 'clsx'
import React from 'react'
type Props = {
  on?: boolean
  disabled?: boolean
}
const Toggle = ({ on, disabled }: Props) => {
  return (
    <span
      className={clsx('c-toggle', {
        '--on': on ?? false,
      })}
    >
      <span className={'c-toggle__ball'}></span>
    </span>
  )
}

export default Toggle
