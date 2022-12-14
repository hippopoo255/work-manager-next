import { createContext } from 'react'
import { AuthAction, AuthState } from './types'
import initialState from '~/stores/initialState'

export const AuthContext = createContext<{
  auth: AuthState
  dispatch: React.Dispatch<AuthAction>
}>({
  auth: initialState.auth,
  dispatch: () => undefined,
})
