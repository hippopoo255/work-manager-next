import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation()

  const handleClick = useCallback(() => {
    update({ mode: on ? 'light' : 'dark' })
  }, [on])

  return (
    <button onClick={handleClick} className={'p-theme-toggle'}>
      <Toggle on={on} />
      <span className={className ?? 'text-fc-secondary text-sm ml-2'}>
        {label ?? t('label.darkMode')}
      </span>
    </button>
  )
}
export default ThemeToggle
