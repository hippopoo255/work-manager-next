'use client'

import { createContext } from 'react'
import { ThemeAction, ThemeState } from './types'
import initialState from '~/stores/initialState'

export const ThemeContext = createContext<{
  theme: ThemeState
  dispatch: React.Dispatch<ThemeAction>
}>({
  theme: initialState.theme,
  dispatch: () => undefined,
})
