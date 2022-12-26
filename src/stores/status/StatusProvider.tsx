'use client'

import { useReducer } from 'react'
import { StatusContext } from './StatusContext'
import { statusReducer } from './reducer'
import initialState from '~/stores/initialState'

type Props = {
  children: React.ReactNode
}

const StatusProvider = ({ children }: Props) => {
  const [status, dispatch] = useReducer(statusReducer, initialState.status)

  return (
    <>
      <StatusContext.Provider value={{ status, dispatch }}>
        {children}
      </StatusContext.Provider>
    </>
  )
}

export default StatusProvider
