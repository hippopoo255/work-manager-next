'use client'

import clsx from 'clsx'
import { useRef, useMemo } from 'react'
import { ButtonProps as Props } from './types'
import { useRippleEffect } from '~/services/parts/ripple'

const sizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  default: '1rem',
  lg: '1.125rem',
  xl: '1.5rem',
}

const Button = (props: Props) => {
  const ref = useRef({} as HTMLButtonElement)
  const { handleMouseDown, handleMouseUp, effectStyle } = useRippleEffect({
    ref,
    effectDuration: props.effectDuration ?? 1000,
  })
  const iconSize = useMemo(() => sizes[props.size ?? 'default'], [props.size])

  return (
    <button
      type="button"
      className={clsx(`c-button ${props.className ?? ''}`, {
        '--loading': props.loading ?? false,
        [`--${props.size}`]: props.size ?? false,
      })}
      onClick={props.onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={ref}
    >
      <span className="c-button__effect" style={effectStyle} />
      <span className={'c-button__text'}>{props.text}</span>
      {(props.loading ?? false) && (
        <span className="c-button__loader">
          <span
            className={clsx(`c-button__loader-icon ${props.className}`, {
              [`--${props.size}`]: props.size ?? false,
            })}
          ></span>
        </span>
      )}
    </button>
  )
}

export default Button
