const requestUri = {
  // auth
  login: '/login',
  testLogin: '/testlogin',
  logout: '/logout',
  currentUser: '/user/current',
  currentUserWithChat: '/user/current/chat_rooms',
  forgotPassword: '/password/email',
  resetPassword: '/password/reset',
  organization: {
    store: '/organization',
    update: '/organization/{id}',
  },
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
  prefecture: {
    list: '/prefecture',
  },
  user: {
    list: '/user',
    chatRoom: '/user/{id}/chat_room',
  },
  chatRoom: {
    post: '/chat_room',
    put: '/chat_room/{id}',
    delete: '/chat_room/{id}',
    id: '/chat_room/{id}',
    read: '/chat_room/{id}/read',
    unreadRecently: '/author/chat_message/unread/recently',
    findByOwner: '/author/chat_room',
  },
  chatMessage: {
    post: '/chat_room/{chat_room_id}/message',
    put: '/chat_room/{chat_room_id}/message/{id}',
    delete: '/chat_room/{chat_room_id}/message/{id}',
    report: '/chat_message/{id}/report',
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
  reportCategories: {
    index: '/report_category',
  },
  activity: {
    myRecently: '/user/:id/activity',
    read: '/user/:id/activity/read',
    list: '/activity',
  },
}

export default requestUri
