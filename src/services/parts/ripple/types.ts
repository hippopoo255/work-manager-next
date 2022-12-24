import { RefObject } from 'react'

export type State = {
  opacity: number
  transformX: number
  transformY: number
  transformScale: number
  transitionDuration: number
  effectDuration: number
}

export type Props = {
  ref: RefObject<HTMLElement>
} & Partial<State>
