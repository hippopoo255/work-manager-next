export default {
  title: 'ジョブサポ',
  head: {
    title: {
      login: 'ログイン',
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
    passwordForget: 'パスワードをお忘れの方',
  },
}
