'use client'

import { createContext } from 'react'
import { StatusAction, StatusState } from './types'
import initialState from '~/stores/initialState'

export const StatusContext = createContext<{
  status: StatusState
  dispatch: React.Dispatch<StatusAction>
}>({
  status: initialState.status,
  dispatch: () => undefined,
})
