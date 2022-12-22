import clsx from 'clsx'
import { useRef } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BorderButtonProps as Props } from './types'
import { useEventEffect } from '~/services/event'

const Button = (props: Props) => {
  const ref = useRef({} as HTMLButtonElement)
  const { handleMouseDown, handleMouseUp, effectSytle } = useEventEffect({
    ref,
    effectDuration: props.effectDuration ?? 1000,
  })

  return (
    <button
      type="button"
      className={clsx(`c-border-button ${props.className}`, {
        '--loading': props.loading ?? false,
      })}
      onClick={props.onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={ref}
    >
      <span className="c-border-button__effect" style={effectSytle} />
      <span className={'c-border-button__text'}>{props.text}</span>
      {(props.loading ?? false) && (
        <span className={`c-border-button__loader ${props.className}`}>
          <AiOutlineLoading3Quarters />
        </span>
      )}
    </button>
  )
}

export default Button
