import { useState, useMemo, useCallback, MouseEvent } from 'react'
import { State, Props } from './types'

const defaultState: State = {
  opacity: 0,
  transformX: 0,
  transformY: 0,
  transformScale: 1,
  transitionDuration: 0,
  effectDuration: 1000,
}

const useEventEffect = (props: Props) => {
  const [state, setState] = useState<State>({
    ...defaultState,
    ...props,
  })

  const tx = useMemo(
    () => `translateX(${state.transformX}px)`,
    [state.transformX]
  )

  const ty = useMemo(
    () => `translateY(${state.transformY}px)`,
    [state.transformY]
  )

  const ts = useMemo(
    () => `scale(${state.transformScale})`,
    [state.transformScale]
  )

  const effectSytle = useMemo(
    () => ({
      opacity: state.opacity,
      transform: `${tx} ${ty} ${ts}`,
      transitionDuration: `${state.transitionDuration / 1000}s`,
    }),
    [state.opacity, tx, ty, ts, state.transitionDuration]
  )

  const handleMouseDown = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.persist()
    setState((prev) => {
      if (props.ref.current === null) return prev
      const clickX = e.pageX
      const clickY = e.pageY
      const clientRect = props.ref.current.getBoundingClientRect()
      const positionX = clientRect.left + window.pageXOffset
      const positionY = clientRect.top + window.pageYOffset
      const transformX = clickX - positionX
      const transformY = clickY - positionY
      return {
        ...prev,
        opacity: 0.5,
        transformX,
        transformY,
        transformScale: 0,
        transitionDuration: 0,
      }
    })
  }, [])

  const handleMouseUp = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.persist()
    setState((prev) => ({
      ...prev,
      opacity: 0,
      transformScale: 1,
      transitionDuration: prev.effectDuration,
    }))
  }, [])

  return {
    effectSytle,
    handleMouseDown,
    handleMouseUp,
  }
}

export default useEventEffect
