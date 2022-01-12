export default {
  title: 'Job Support',
  head: {
    title: {
      login: 'Log in',
    },
  },
  main: {
    title: 'What is :site_title？',
    description:
      ':site_title is a service that aims to be a "convenient and easy-to-use business support system." By using this service, you can complete tasks such as "meeting minutes creation", "schedule management", and "task management".  n In recent years, due to the promotion of telework, etc., there have been more opportunities to work while there is a physical distance between internal members.  nThis service also has a "chat function" that contributes to communication in such an environment.',
    descriptionOmit:
      ':site_title is a business support service that provides functions such as "meeting record creation," "schedule management," "task management," and "chat."',
  },
  authMenu: {
    mypage: 'My Page',
    profile: 'Profile',
    logout: 'Log out',
  },
  sidebar: {
    home: 'TOP',
    meeting: {
      parent: 'Meeting',
      children: {
        index: 'List Record',
        create: 'Add Record',
      },
    },
    schedule: {
      parent: 'Schedule',
    },
    task: {
      parent: 'Task',
    },
    chat: {
      parent: 'Chat',
    },
    blog: {
      parent: 'Blog',
    },
    document: {
      parent: 'Document',
    },
    setting: {
      parent: 'Settings',
    },
  },
  application: {
    meetingRecord: '議事録作成機能',
    schedule: 'スケジュール機能',
    task: 'タスク機能',
    chat: 'チャット機能',
  },
  blog: {
    status: {
      done: 'post',
      pending: 'pre save',
    },
  },
  common: {
    post: 'post',
    preSave: 'pre save',
    save: 'save',
    testLogin: 'Try as a demo user',
    send: 'send',
    login: 'Log in',
    passwordForget: 'Forgot your password?',
  },
}
