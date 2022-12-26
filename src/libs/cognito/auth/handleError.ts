// import router from 'next/navigation'
import { Path } from 'react-hook-form'
import { CognitoErrorMessageType } from '../types'
import { amplifyConfigure } from './init'
import { ja, en } from '~/config/locales'
import { SignInInputs } from '~/schema/generated/@types'

amplifyConfigure()

const errorKeys = {
  UserNotFoundException: 'login_id',
  NotAuthorizedException: 'login_id',
  UserNotConfirmedException: 'login_id',
  UsernameExistsException: 'login_id',
  CodeMismatchException: 'verification_code',
  InvalidParameterException: 'password',
  InvalidPasswordException: 'password',
  LimitExceededException: 'password',
  ExpiredCodeException: 'login_id',
  default: 'login_id',
}

export const handleError = <T = SignInInputs>(
  error: any,
  logPrefix: string = 'sign in failed',
  specifiedKey?: string
) => {
  if (error.code !== undefined) {
    const errCode = error.code as CognitoErrorMessageType
    const { key, message } = getErrorBody<T>(errCode, specifiedKey)
    throw { key, message }
  }
  throw error
}

const getErrorBody = <T = Path<SignInInputs>>(
  errCode: CognitoErrorMessageType,
  specifiedKey?: string
) => {
  const key = specifiedKey || errorKeys[errCode]
  // const t = router.locale === 'en' ? en : ja
  const t = ja
  const message =
    t.message.cognitoError[errCode] || t.message.cognitoError.default
  return { key, message }
}
