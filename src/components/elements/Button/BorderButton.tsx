'use client'

import clsx from 'clsx'
import { useRef } from 'react'
import { BorderButtonProps as Props } from './types'
import { LoaderIcon } from '~/components/elements/Icon'
import { useRippleEffect } from '~/services/parts/ripple'

const BorderButton = (props: Props) => {
  const ref = useRef({} as HTMLButtonElement)
  const { handleMouseDown, handleMouseUp, effectStyle } = useRippleEffect({
    ref,
    effectDuration: props.effectDuration ?? 1000,
  })

  return (
    <button
      type="button"
      className={clsx(`c-border-button ${props.className ?? ''}`, {
        '--loading': props.loading ?? false,
        [`--${props.size}`]: props.size ?? false,
        [`--${props.color}`]: props.color ?? false,
        [`--flat`]: props.flat ?? false,
      })}
      onClick={props.onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={ref}
    >
      <span className="c-border-button__effect" style={effectStyle} />
      <span className={'c-border-button__text'}>{props.text}</span>
      <span
        className={clsx('c-border-button__loader', {
          '--active': props.loading ?? false,
        })}
      >
        <LoaderIcon size={props.size} className={props.className} />
      </span>
    </button>
  )
}

export default BorderButton
