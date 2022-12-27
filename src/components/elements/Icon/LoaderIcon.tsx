import clsx from 'clsx'
// import { useMemo } from 'react'

type Props = {
  className?: string
  size?: 'xs' | 'sm' | 'lg' | 'xl'
}

// const sizes = {
//   xs: '0.75rem',
//   sm: '0.875rem',
//   default: '1rem',
//   lg: '1.125rem',
//   xl: '1.5rem',
// }

const LoaderIcon = (props: Props) => {
  // const iconSize = useMemo(() => sizes[props.size ?? 'default'], [props.size])
  return (
    <span
      className={clsx(`c-loader-icon ${props.className}`, {
        [`--${props.size}`]: props.size ?? false,
      })}
    ></span>
  )
}

export default LoaderIcon
