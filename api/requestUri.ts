const requestUri = {
  // auth
  login: '/login',
  testLogin: '/testlogin',
  logout: '/logout',
  currentUser: '/user/current',
  currentUserWithChat: '/user/current/chat_rooms',
  forgotPassword: '/password/email',
  resetPassword: '/password/reset',
  // master
  priority: {
    list: '/priority',
  },
  progress: {
    list: '/progress',
  },
  meetingPlace: {
    list: '/meeting_place',
  },
  user: {
    list: '/user',
  },
  chatRoom: {
    list: '/author/chat_room',
    post: '/chat_room',
    put: '/chat_room/',
    delete: '/chat_room/',
    id: '/chat_room/',
    read: '/chat_room/',
    unreadRecently: '/author/chat_message/unread/recently',
  },
  chatMessage: {
    list: '/author/chat_room',
    post: '/chat_room/{chat_room_id}/message',
    put: '/chat_room/{chat_room_id}/message/{id}',
    delete: '/chat_room/{chat_room_id}/message/{id}',
  },
  task: {
    post: '/task',
    put: '/task',
    myTask: '/author/task',
    myBusyTask: '/author/task/busy',
  },
  meetingRecord: {
    list: '/meeting_record',
    id: '/meeting_record',
    put: '/meeting_record',
    post: '/meeting_record',
    delete: '/meeting_record',
    ids: 'meeting_record/ids',
    bookmark: '/meeting_record/:id/bookmark',
    unbookmark: '/meeting_record/:id/bookmark',
    myRecently: '/author/meeting_record/recently',
  },
  schedule: {
    list: '/user/:id/schedule',
    post: '/schedule',
    put: '/schedule/',
    delete: '/schedule/',
    myDaily: '/author/schedule/daily',
  },
  notifyStatus: '/user/',
  activity: {
    myRecently: '/user/:id/activity',
    read: '/user/:id/activity/read',
    list: '/activity',
  },
}

export default requestUri
