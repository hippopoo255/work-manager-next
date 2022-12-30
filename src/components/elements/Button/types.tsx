import { IconType } from 'react-icons'

export type ButtonProps = {
  text: string
  size?: 'xs' | 'sm' | 'lg' | 'xl'
  color?: string
  flat?: boolean
  round?: boolean
  loading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  className?: string
  effectDuration?: number
  effectSize?: number
  [k: string]:
    | string
    | number
    | boolean
    | undefined
    | React.MouseEventHandler<HTMLButtonElement>
    | Function
    | JSX.Element
}

export type BorderButtonProps = ButtonProps & {}
export type IconButtonProps = ButtonProps & {
  icon: JSX.Element
}
