const requestUri = {
  login: '/login',
  logout: '/logout',
  currentUser: '/user/current',
  currentUserWithChat: '/user/current/chat_rooms',
  priority: {
    list: '/priority',
  },
  chatRoom: {
    list: '/author/chat_room',
    post: '/chat_room',
    put: '/chat_room/',
    delete: '/chat_room/',
    id: '/chat_room/',
  },
  chatMessage: {
    list: '/author/chat_room',
    post: '/chat_room',
    put: '/chat_room/',
    delete: '/chat_room/',
    id: '/chat_room/',
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
  schedule: {
    list: '/user/{id}/schedule',
    post: '/schedule',
    put: '/schedule/',
    delete: '/schedule/',
  },
}

export default requestUri
