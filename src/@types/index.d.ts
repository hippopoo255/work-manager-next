declare module '.svg'

declare type RequiredFor<T, K extends keyof T> = Omit<T, K> &
  Required<Pick<T, K>>
