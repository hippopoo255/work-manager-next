'use client'

import { useReducer } from 'react'
import { ThemeContext } from './Context'
import { themeReducer } from './reducer'
import initialState from '~/stores/initialState'

type Props = {
  children: React.ReactNode
}

const ThemeProvider = ({ children }: Props) => {
  const [theme, dispatch] = useReducer(themeReducer, initialState.theme)

  return (
    <>
      <ThemeContext.Provider value={{ theme, dispatch }}>
        {children}
      </ThemeContext.Provider>
    </>
  )
}

export default ThemeProvider
