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
  link: {
    passwordForgotten: 'I forgot my password',
    alreadyHaveAccount: 'Sign in',
    dontHaveAccount: "Don't have an account yet?",
  },
  signIn: {
    title: 'Sign In',
    submit: 'Register',
    demoSignIn: 'Attempt as a deemo user',
  },
  signUp: {
    title: 'Create Account',
    submit: 'Create Account',
  },
  resetPassword: {
    title: 'Reset password',
    submit: 'Reset password',
  },
  sendPasswordForgotten: {
    title: 'Send a password forgotten mail',
    submit: 'Receive Verification Code',
  },
  main: {
    title: 'What is :site_title？',
    description:
      ':site_title is a service that aims to be a "convenient and easy-to-use business support system." By using this service, you can complete tasks such as "minutes creation", "schedule management", and "task management".  n In recent years, due to the promotion of telework, etc., there have been more opportunities to work while there is a physical distance between internal members.  nThis service also has a "chat function" that contributes to communication in such an environment.',
    descriptionOmit:
      ':site_title is a business support service that provides functions such as "minutes creation," "schedule management," "task management," and "chat."',
  },
  validation: {
    mixed: {
      required: '必須項目です',
      notType: `形式が違います`,
    },
    string: {
      length: '文字で入力してください',
      min: '文字以上で入力してください',
      max: '文字以下で入力してください',
      matches: '形式が正しくありません',
      url: 'URLの形式が正しくありません',
      uuid: 'UUIDの形式が正しくありません',
      trim: '前後のスペースを削除してください',
      lowercase: '小文字で入力してください',
      uppercase: '大文字で入力してください',
    },
    number: {
      min: '以上で入力してください',
      max: '以下で入力してください',
      lessThan: 'より小さい値を入力してください',
      moreThan: 'より大きい値を入力してください',
      positive: '正の数を入力してください',
      negative: '負の数を入力してください',
      integer: '整数を入力してください',
    },
    date: {
      min: 'より後の日付を入力してください',
      max: 'より前の日付を入力してください',
    },
    boolean: {
      isValue: '値が必要です',
    },
    object: {
      noUnknown: '指定されていない項目を含めることはできません',
    },
    array: {
      length: 'の項目が必要です',
      min: '以上の項目が必要です',
      max: '以下の項目が必要です',
    },
  },
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
    ExpiredCodeException: 'Invalid code provided, please request a code again.',
    default: 'Verification failed',
  },
}
