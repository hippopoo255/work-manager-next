export type ButtonProps = {
  text: string
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