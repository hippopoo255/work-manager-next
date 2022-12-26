'use client'

import { useCallback } from 'react'
import useThemeContext from './useThemeContext'
import { themeOperation } from '~/stores/theme'
import { ThemeState } from '~/stores/theme/types'
import { getCookieValueFromDocumentByName } from '~/utils'

const useStatus = () => {
  const { theme, dispatch } = useThemeContext()

  const update = useCallback((context: ThemeState) => {
    document.cookie = `theme=${context.mode}`
    themeOperation.set(dispatch, context)
  }, [])

  const clear = useCallback(() => {
    themeOperation.clear(dispatch)
  }, [])

  const init = () => {
    let mode: ThemeState['mode']
    const osDark = window.matchMedia('(prefers-color-scheme: dark)')

    const cookie = getCookieValueFromDocumentByName(
      'theme'
    ) as ThemeState['mode']

    if (cookie) {
      mode = cookie
    } else {
      mode = osDark.matches ? 'dark' : 'light'
    }

    update({ mode })

    osDark.addListener(function () {
      update({
        mode: osDark.matches ? 'dark' : 'light',
      })
    })
  }

  return {
    theme,
    update,
    clear,
    init,
  }
}
export default useStatus
