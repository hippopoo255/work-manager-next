import { AuthState } from './auth/types'
import { StatusState } from './status/types'

export interface GlobalState {
  auth: AuthState
  status: StatusState
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
}

export default initialState
