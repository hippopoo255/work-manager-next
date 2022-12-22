import { ISignUpResult } from 'amazon-cognito-identity-js'
import { Auth } from 'aws-amplify'
import { handleError } from './handleError'
import { amplifyAdminConfigure, amplifyConfigure } from './init'

import { SignUpInputs } from '~/schema/generated/@types'

const signup = async ({
  email,
  user_id,
  password,
  address,
  family_name,
  family_name_kana,
  given_name,
  given_name_kana,
}: SignUpInputs) => {
  amplifyAdminConfigure()
  try {
    const { user }: ISignUpResult = await Auth.signUp({
      username: user_id,
      password,
      attributes: {
        email, // optional
        address: address || '', // optional - E.164 number convention
        given_name: given_name,
        family_name: family_name,
        // other custom attributes
        'custom:login_id': user_id,
        'custom:given_name_kana': given_name_kana,
        'custom:family_name_kana': family_name_kana,
        // 'custom:role_id': '2',
        // 'custom:department_code': '5',
      },
    })
    amplifyConfigure()
    return user
  } catch (error) {
    amplifyConfigure()
    handleError<SignUpInputs>(error, 'admin sign up failed')
    return ''
  }
}

const cognitoAdmin = {
  signup,
}

export default cognitoAdmin
