import { CognitoErrorMessageType } from '@/lib/auth/cognito/util'
export default {
  siteTitle: 'Job Support',
  head: {
    title: {
      login: 'Log in',
      signup: 'Sign Up',
      organizationStore: 'Organization register',
      mypage: {
        index: 'Dashboard',
        blog: {
          index: 'Blog',
          create: 'New Blog',
        },
      },
      accountVerification: 'Account verification',
      accountSetup: 'Account setup',
      forgot_password: 'Forgot Password',
      reset_password: 'Reset Password',
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
    meetingRecord: 'Meeting Record',
    schedule: 'Schedule Manager',
    task: 'Task Manager',
    chat: 'Chat',
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
    store: '登録',
    testLogin: 'Try as a demo user',
    send: 'send',
    login: 'Log in',
    signup: 'Create account',
    accountVerification: 'Verify account',
    passwordForget: 'Forgot your password?',
    more: 'Show more',
    showCalendar: 'Show your calendar',
    showExpiredTasks: 'Show more',
    showApproachedTasks: 'Show more',
    showChatRooms: 'Show your chat rooms',
    moveToLogin: 'Do you already have an account?',
  },
  mypage: {
    recentMeetingRecord: 'Recent Meeting Record',
    dailySchedule: "Today's Schedule",
    expiredTasks: 'Expired Tasks',
    approachedTasks: 'Approached Tasks',
    unreadChat: 'Unread Chat',
  },
  label: {
    passwordRule: 'Password Rule',
  },
  rule: {
    password: [
      '① at least 8 chars.',
      '② require UPPER CASE LETTER at least 1 char',
      '③ require lower case letter at least 1 char',
      '④ require numeric at least 1 char',
    ],
  },
  status: {
    recent: 'recent',
    max: 'max',
  },
  unit: {
    item: ' item',
  },
  date: {
    short: (year: string, month: string, day: string, dayOfWeekStr: string) => {
      if (year.length) {
        year.slice(-1, 1)
      }
      return `${dayOfWeekStr}, ${month}${day} ${year}`
    },
    simple: (
      year: string,
      month: string,
      day: string,
      dayOfWeekStr: string,
      hour: string,
      minute: string
    ) => `${dayOfWeekStr}, ${month}${day} ${year} ${hour}${minute}`,
    dayOfStrList: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  tooltip: {
    qa: (contents: string) => `what is "${contents}"？`,
  },
  message: {
    testLoginFail: 'please log out of your current account.',
    cognitoError: {
      UserNotFoundException: 'User does not exist.',
      NotAuthorizedException: 'Incorrect username or password',
      UserNotConfirmedException: 'Account verification is not yet completed',
      UsernameExistsException: 'User already exists',
      CodeMismatchException: 'Invalid verification code',
      InvalidParameterException: 'Invalid attribute',
      InvalidPasswordException: 'Invalid password format',
      LimitExceededException:
        'Attempt limit exceeded, please try after some time.',
      ExpiredCodeException:
        'Invalid code provided, please request a code again.',
      default: 'Verification failed',
    } as { [k in CognitoErrorMessageType]: string },
  },
}
