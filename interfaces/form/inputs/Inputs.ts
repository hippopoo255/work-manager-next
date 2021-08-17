export interface Inputs<T, U> {
  [k: string]:
    | string
    | number
    | boolean
    | null
    | Date
    | (T | U | number | string)[]
    | undefined
}
