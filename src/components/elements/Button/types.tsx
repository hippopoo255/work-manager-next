export type ButtonProps = {
  text: string
  size?: 'xs' | 'sm' | 'lg' | 'xl'
  color?: string
  flat?: boolean
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
}

export type BorderButtonProps = ButtonProps & {}
