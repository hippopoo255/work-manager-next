import { CognitoErrorMessageType } from '@/lib/auth/cognito/util'

export default {
  siteTitle: 'ジョブサポ',
  head: {
    title: {
      login: 'ログイン',
      signup: 'ユーザ登録',
      mypage: {
        index: 'ダッシュボード',
        blog: {
          index: 'ブログ',
          create: 'ブログ新規投稿',
        },
      },
      accountVerification: 'アカウント確認',
    },
  },
  main: {
    title: ':site_titleとは？',
    description:
      ':site_titleは、「便利で使いやすい業務支援システム」を目指したサービスです。「会議の議事録作成」「スケジュール管理」「タスク管理」等の業務を当サービス内で完結させることができます。\n近年はテレワークの推進等により、社内メンバー間の物理的距離が生じる中で業務をする機会が増えました。\n当サービスでは、そうした環境下でのコミュニケーションに貢献する「チャット機能」も備えております。',
    descriptionOmit:
      ':site_titleは、「議事録の作成」「スケジュール管理」「タスク管理」「チャット」といった機能を提供する業務支援サービスです。',
  },
  authMenu: {
    mypage: 'マイページ',
    profile: 'プロフィール',
    logout: 'ログアウト',
  },
  sidebar: {
    home: 'トップ',
    meeting: {
      parent: '会議',
      children: {
        index: '議事録一覧',
        create: '議事録追加',
      },
    },
    schedule: {
      parent: 'スケジュール',
    },
    task: {
      parent: 'タスク',
    },
    chat: {
      parent: 'チャット',
    },
    blog: {
      parent: 'ブログ',
    },
    document: {
      parent: 'ドキュメント',
    },
    setting: {
      parent: '設定',
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
      done: '本投稿',
      pending: '下書き保存',
    },
  },
  common: {
    post: '投稿',
    preSave: '下書き保存',
    save: '保存',
    testLogin: 'デモユーザとして試す',
    send: '送信',
    login: 'ログイン',
    signup: 'アカウント作成',
    accountVerification: 'アカウントを検証する',
    passwordForget: 'パスワードをお忘れの方',
    more: 'もっと見る',
    showCalendar: 'カレンダーを見る',
    showExpiredTasks: '期限経過のタスクをすべて見る',
    showApproachedTasks: '期限が近いタスクをすべて見る',
    showChatRooms: 'ルーム一覧画面へ',
    moveToLogin: '既にアカウントをお持ちの方',
  },
  mypage: {
    recentMeetingRecord: '最近の議事録',
    dailySchedule: '本日の予定',
    expiredTasks: '期限を過ぎたタスク',
    approachedTasks: '期限の近いタスク',
    unreadChat: '未読のチャット',
  },
  label: {
    passwordRule: 'パスワードの条件',
  },
  rule: {
    password: [
      '① 8文字以上',
      '② 大文字[A〜Z]を最低1文字含める',
      '③ 小文字[a〜z]を最低1文字含める',
      '④ 数字[0〜9]を最低1文字含める',
    ],
  },
  status: {
    recent: '最近',
    max: '最大',
  },
  unit: {
    item: '件',
  },
  date: {
    short: (year: string, month: string, day: string, dayOfWeekStr: string) =>
      `${year}${month}${day}(${dayOfWeekStr})`,
    simple: (
      year: string,
      month: string,
      day: string,
      dayOfWeekStr: string,
      hour: string,
      minute: string
    ) => `${year}${month}${day}(${dayOfWeekStr}) ${hour}${minute}`,
    dayOfStrList: ['日', '月', '火', '水', '木', '金', '土'],
  },
  tooltip: {
    qa: (contents: string) => `${contents}とは？`,
  },
  message: {
    testLoginFail: '現在のアカウントからログアウトしてください',
    cognitoError: {
      UserNotFoundException: 'アカウントが存在しません',
      NotAuthorizedException: '認証に失敗しました',
      UserNotConfirmedException: 'アカウントの検証が完了していません',
      UsernameExistsException: '同じ名前のユーザーが既に登録されています',
      CodeMismatchException: '検証コードに誤りがあります',
      InvalidParameterException: '入力項目が正しくありません',
      InvalidPasswordException: 'パスワードの形式が正しくありません',
      LimitExceededException: 'パスワードが試行回数を超えました',
      ExpiredCodeException:
        '既に検証済みのアカウントか、有効期限切れの可能性があります',
      default: '検証に失敗しました',
    } as { [k in CognitoErrorMessageType]: string },
  },
}
