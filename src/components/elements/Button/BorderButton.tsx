'use client'

import clsx from 'clsx'
import { useRef, useMemo } from 'react'
import { BorderButtonProps as Props } from './types'
import { useRippleEffect } from '~/services/parts/ripple'

const sizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  default: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
}

const BorderButton = (props: Props) => {
  const ref = useRef({} as HTMLButtonElement)
  const { handleMouseDown, handleMouseUp, effectStyle } = useRippleEffect({
    ref,
    effectDuration: props.effectDuration ?? 1000,
  })

  const iconSize = useMemo(() => sizes[props.size ?? 'default'], [props.size])

  return (
    <button
      type="button"
      className={clsx(`c-border-button ${props.className ?? ''}`, {
        '--loading': props.loading ?? false,
        [`--${props.size}`]: props.size ?? false,
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
        <span
          className={clsx(`c-border-button__loader-icon ${props.className}`, {
            [`--${props.size}`]: props.size ?? false,
          })}
        ></span>
      </span>
    </button>
  )
}

export default BorderButton
