const requestUri = {
  login: '/login',
  logout: '/logout',
  currentUser: '/user/current',
  priority: {
    list: '/priority',
  },
  progress: {
    list: '/progress',
  },
  meetingPlace: {
    list: '/meeting_place',
  },
  task: {
    post: '/task',
    put: '/task',
    mytask: '/author/task',
  },
  meetingRecord: {
    list: '/author/meeting_record',
    id: '/meeting_record',
    put: '/meeting_record',
    post: '/meeting_record',
    delete: '/meeting_record',
    ids: 'meeting_record/ids',
  },
  user: {
    list: '/user',
  },
}

export default requestUri
