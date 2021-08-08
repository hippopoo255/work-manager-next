export interface Inputs<T, U> {
  [k: string]: string | number | null | Date | (T | U | number | string)[]
}
