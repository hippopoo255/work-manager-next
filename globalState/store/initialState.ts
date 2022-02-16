import { GlobalState } from '@/interfaces/state'

const initialState: GlobalState = {
  user: {
    id: 0,
    email: '',
    family_name: '',
    family_name_kana: '',
    given_name: '',
    given_name_kana: '',
    daily_schedule: [],
    recent_meeting_records: [],
  },
  isLogin: false,
}

export default initialState
