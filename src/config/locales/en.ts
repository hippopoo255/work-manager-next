import { CognitoErrorMessageType } from '~/libs/cognito/types'

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
      ':site_title is a service that aims to be a "convenient and easy-to-use business support system." By using this service, you can complete tasks such as "minutes creation", "schedule management", and "task management".  n In recent years, due to the promotion of telework, etc., there have been more opportunities to work while there is a physical distance between internal members.  nThis service also has a "chat function" that contributes to communication in such an environment.',
    descriptionOmit:
      ':site_title is a business support service that provides functions such as "minutes creation," "schedule management," "task management," and "chat."',
  },
  chat: {
    report: 'Report this chat',
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
    minutes: 'Minutes',
    schedule: 'Schedule Manager',
    task: 'Task Manager',
    chat: 'Chat',
    notification: 'About Notification',
    realtime: 'About Realtime',
  },
  feature: {
    minutes: {
      name: 'Minutes',
      linkText: 'Minutes',
      mission: '会議の決定事項を記録する',
      points: [
        {
          text: '入力フォームから議事録を作成し、会議の決議事項を記録できます。',
        },
        {
          text: '過去の議事録をオンラインで確認でき、自分の参加した会議のみを表示させたり、ブックマークに追加したりできます。',
        },
        {
          text: '議事録を新規で追加すると、通知をオンにしている参加メンバーにはメールが届きます。',
        },
      ],
      description:
        '移動中などでも入力フォームに沿ってサクッと議事録を作成でき、通知をオンにしている参加メンバーにはメールでお知らせが届きます。\n社内の意思決定をオンラインで共有し、チームワークを向上させましょう。',
    },
    schedule: {
      name: 'Schedule',
      linkText: 'Schedule Manager',
      mission: 'スケジュールを立てる',
      points: [
        {
          text: '他のユーザーとスケジュールを共有できます。',
        },
        {
          text: '共有相手の編集権限や、共有していないユーザーに対する公開設定などのオプションを設定できます。',
        },
        {
          text: '当日のスケジュールを毎朝メールで通知します。',
        },
      ],
      description:
        '出張やミーティングの予定を他のユーザーと共有できます。\nスケジュールはドラッグアンドドロップで変更でき、リスケも手軽に行えます。',
    },
    task: {
      name: 'Task',
      linkText: 'Task Manager',
      mission: 'Set priorities',
      points: [
        {
          text: '優先度や締切日時を設定できます。',
        },
        {
          text: 'ステータスを更新して進捗状況を管理できます。',
        },
        {
          text: '期限が翌日に迫ったタスクは前日にメールでアラートされます。',
        },
      ],
      description:
        'タスクの登録時に締切日時を設定するので優先順位が一目瞭然。\n通知をオンにすると、締切が翌日に迫ったタスクをメールでお知らせします。',
    },
    blog: {
      name: 'Blog',
      linkText: 'Blog',
      mission: 'Share knowledge',
      points: [
        {
          text: '優先度や締切日時を設定できます。',
        },
        {
          text: 'ステータスを更新して進捗状況を管理できます。',
        },
        {
          text: '期限が翌日に迫ったタスクは前日にメールでアラートされます。',
        },
      ],
      description:
        'タスクの登録時に締切日時を設定するので優先順位が一目瞭然。\n通知をオンにすると、締切が翌日に迫ったタスクをメールでお知らせします。',
    },
    chat: {
      name: 'Chat',
      linkText: 'Chat',
      mission: 'Talk using text',
      points: [
        {
          text: 'チャットによるコミュニケーションができます。',
        },
        {
          text: '投稿1回につき4枚まで画像の送信ができます。',
        },
        {
          text: 'ブラウザをリロードしなくても、新着メッセージやメンバーの既読が確認できます。',
        },
      ],
      description:
        '業務報告や相談等の専用ルームを作成し、テレワークの環境でも円滑なコミュニケーションができます。\nテキストでのチャットはもちろん、1回のメッセージで最大4枚まで画像をアップロードできます。',
    },
    notification: '通知',
    realtime: 'リアルタイム',
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
    store: 'register',
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
    minutes: 'Recent Minutes',
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
