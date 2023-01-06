export type PositionX = 'left' | 'right'
export type PositionY = 'top' | 'bottom'
// {[positionX]: px, [positionY]: px}
export type PositionType = {
  top?: number
  bottom?: number
  left?: number
  right?: number
  [k: string]: number | undefined
}
