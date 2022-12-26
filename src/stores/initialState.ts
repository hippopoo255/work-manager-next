import { AuthState } from './auth/types'
import { StatusState } from './status/types'
import { ThemeState } from './theme/types'

export interface GlobalState {
  auth: AuthState
  status: StatusState
  theme: ThemeState
}

const initialState: GlobalState = {
  auth: {
    user: {
      id: 0,
      email: '',
      family_name: '',
      family_name_kana: '',
      full_name: '',
      given_name: '',
      given_name_kana: '',
    },
    isSignedIn: false,
  },
  status: {
    message: undefined,
    statusCode: undefined,
  },
  theme: {
    mode: 'light',
  },
}

export default initialState
