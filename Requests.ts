const requests = {
  login: '/login',
  logout: '/logout',
  currentUser: '/user/current',
  priority: {
    list: '/priority',
  },
  progress: {
    list: '/progress',
  },
  task: {
    post: '/task',
    put: '/task',
    mytask: '/author/task',
  },
}

export default requests
