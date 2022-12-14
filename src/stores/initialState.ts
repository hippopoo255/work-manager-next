import { AuthState } from './auth/types'

export interface GlobalState {
  auth: AuthState
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
}

export default initialState
