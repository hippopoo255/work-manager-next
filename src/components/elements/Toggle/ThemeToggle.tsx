import React, { useCallback, useMemo } from 'react'
import Toggle from './Toggle'
import { useTheme } from '~/services/theme'

type Props = {
  label?: string
  className?: string
}

const ThemeToggle = ({ className, label }: Props) => {
  const { theme, update } = useTheme()
  const on = useMemo(() => theme.mode === 'dark', [theme.mode])

  const handleClick = useCallback(() => {
    update({ mode: on ? 'light' : 'dark' })
  }, [on])

  return (
    <button
      onClick={handleClick}
      className={'grid grid-flow-col place-items-center place-content-center'}
    >
      <Toggle on={on} />
      <span className={className ?? 'text-fc-secondary text-sm ml-2'}>
        {label ?? 'ダークモードにする'}
      </span>
    </button>
  )
}
export default ThemeToggle
