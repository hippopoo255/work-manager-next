import { CognitoErrorMessageType } from '@/lib/auth/cognito/util'

export default {
  siteTitle: 'ジョブサポ',
  head: {
    title: {
      login: 'ログイン',
      signup: 'アカウント登録',
      organizationStore: '組織情報登録',
      mypage: {
        index: 'ダッシュボード',
        blog: {
          index: 'ブログ',
          create: 'ブログ新規投稿',
        },
      },
      accountVerification: 'アカウント確認',
      accountSetup: 'アカウント設定',
      forgot_password: 'アカウント確認',
      reset_password: 'パスワードリセット',
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
    minutes: '議事録作成機能',
    schedule: 'スケジュール機能',
    task: 'タスク機能',
    chat: 'チャット機能',
    notification: '通知のタイミング',
    realtime: 'リアルタイムチャット',
  },
  feature: {
    minutes: {
      name: '議事録',
      linkText: '議事録機能',
      mission: '会議の決定事項を記録する',
      points: [
        {
          text: '入力フォームは3ステップで完了します。手軽に議事録を作成し、会議の決議事項等を記録できます。',
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
      name: 'スケジュール',
      linkText: 'スケジュール機能',
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
      name: 'タスク',
      linkText: 'タスク機能',
      mission: '仕事の優先度を決める',
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
      name: 'ブログ',
      linkText: 'ブログ機能',
      mission: '知識を共有する',
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
        '登録時に締切日時を設定するので、優先度の高いタスクが一目瞭然。\n通知をオンにすると、締切が翌日に迫ったタスクをメールでお知らせします。',
    },
    chat: {
      name: 'チャット',
      linkText: 'チャット機能',
      mission: 'テキストベースで会話する',
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
      done: '本投稿',
      pending: '下書き保存',
    },
  },
  common: {
    post: '投稿',
    store: '登録',
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
    minutes: '最近の議事録',
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
      NotAuthorizedException: 'ユーザー名またはパスワードが違います',
      UserNotConfirmedException: 'アカウントの検証が完了していません',
      UsernameExistsException: '同じ名前のユーザーが既に登録されています',
      CodeMismatchException: '検証コードに誤りがあります',
      InvalidParameterException: '入力項目が正しくありません',
      InvalidPasswordException: 'パスワードの形式が正しくありません',
      LimitExceededException:
        'パスワードが試行回数を超えました。しばらくしてからもう一度お試しください',
      ExpiredCodeException:
        '既に検証済みのアカウントか、有効期限切れの可能性があります',
      default: '検証に失敗しました',
    } as { [k in CognitoErrorMessageType]: string },
  },
}
