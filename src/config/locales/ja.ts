import { MessageParams } from 'yup/lib/types'

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
  link: {
    passwordForgotten: 'パスワードをお忘れの方',
    alreadyHaveAccount: '既にアカウントをお持ちの方',
    dontHaveAccount: 'アカウント登録がまだの方',
  },
  signIn: {
    title: 'サインイン',
    submit: 'サインイン',
    demoSignIn: 'デモユーザとして試す',
  },
  signUp: {
    title: 'アカウント登録',
    submit: 'アカウント登録',
  },
  resetPassword: {
    title: 'パスワード再設定フォーム',
    submit: 'パスワードを再設定する',
  },
  sendPasswordForgotten: {
    title: 'パスワード再設定メールを送る',
    submit: 'パスワード再設定メールを送る',
  },
  validation: {
    mixed: {
      default: (params: MessageParams) => `値が無効です`,
      required: (params: MessageParams) => `必須項目です`,
      oneOf: (params: MessageParams & { values: any }) =>
        `次の値のいずれかでなければなりません:${params.values}`,
      notOneOf: (params: MessageParams & { values: any }) =>
        `次の値のいずれかであってはなりません:${params.values}`,
      notType: `形式が違います`,
      defined: ``,
    },
    string: {
      length: ({ label, length }: MessageParams & { length: number }) =>
        `${length}文字で入力してください`,
      min: (params: MessageParams & { min: number }) =>
        // `${labelText(params)}少なくとも${params.min}文字でなければなりません`,
        `${params.min}文字以上で入力してください`,
      max: (params: MessageParams & { max: number }) =>
        `${params.max}文字以下で入力してください`,
      matches: (params: MessageParams & { regex: RegExp }) =>
        `形式が正しくありません`,
      email: (params: MessageParams & { regex: RegExp }) =>
        `メールアドレスの形式が正しくありません`,
      url: (params: MessageParams & { regex: RegExp }) =>
        `URLの形式が正しくありません`,
      uuid: (params: MessageParams & { regex: RegExp }) =>
        `UUIDの形式が正しくありません`,
      trim: (params: MessageParams) => `前後のスペースを削除してください`,
      lowercase: (params: MessageParams) => `小文字で入力してください`,
      uppercase: (params: MessageParams) => `大文字で入力してください`,
    },
    number: {
      min: (params: MessageParams & { min: number }) =>
        `${params.min}以上で入力してください`,
      max: (params: MessageParams & { max: number }) =>
        `${params.max}以下で入力してください`,
      lessThan: (params: MessageParams & { less: number }) =>
        `${params.less}より小さい値を入力してください`,
      moreThan: (params: MessageParams & { more: number }) =>
        `${params.more}より大きい値を入力してください`,
      positive: (params: MessageParams & { more: number }) =>
        `正の数を入力してください`,
      negative: (params: MessageParams & { less: number }) =>
        `負の数を入力してください`,
      integer: (params: MessageParams) => `整数を入力してください`,
    },
    date: {
      min: (params: MessageParams & { min: Date | string }) =>
        `${params.min}より後の日付を入力してください`,
      max: (params: MessageParams & { max: Date | string }) =>
        `${params.max}より前の日付を入力してください`,
    },
    boolean: {
      // isValue: (params: MessageParams) => `${labelText(params)}値が必要です`,
      isValue: (params: MessageParams) => `値が必要です`,
    },
    object: {
      noUnknown: (params: MessageParams) =>
        `指定されていない項目を含めることはできません`,
    },
    array: {
      length: (params: MessageParams & { length: number }) =>
        `${params.length}個が必要です`,
      min: (params: MessageParams & { min: number }) =>
        `${params.min}個以上の項目が必要です`,
      max: (params: MessageParams & { max: number }) =>
        `${params.max}個以下の項目が必要です`,
    },
  },
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
  },
}
