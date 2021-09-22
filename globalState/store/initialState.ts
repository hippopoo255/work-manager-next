import { GlobalState } from '@/interfaces/state'

const initialState: GlobalState = {
  user: {
    id: 0,
    given_name: '',
    family_name: '',
    daily_schedule: [],
    recent_meeting_records: [],
  },
  isLogin: false,
}

export default initialState
