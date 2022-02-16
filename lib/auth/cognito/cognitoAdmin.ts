// import userPool from './userPool'
import { handleError } from './util'
import { amplifyAdminConfigure, amplifyConfigure } from './config'
import { Auth } from 'aws-amplify'

import { ISignUpResult } from 'amazon-cognito-identity-js'
import { SignupInputs } from '@/interfaces/form/inputs'

const signup = async ({
  email,
  login_id,
  password,
  address,
  family_name,
  family_name_kana,
  given_name,
  given_name_kana,
}: SignupInputs) => {
  amplifyAdminConfigure()
  try {
    const { user }: ISignUpResult = await Auth.signUp({
      username: login_id,
      password,
      attributes: {
        email, // optional
        address: address || '', // optional - E.164 number convention
        given_name: given_name,
        family_name: family_name,
        // other custom attributes
        'custom:login_id': login_id,
        'custom:given_name_kana': given_name_kana,
        'custom:family_name_kana': family_name_kana,
        // 'custom:role_id': '2',
        // 'custom:department_code': '5',
      },
    })
    // console.log('signup succeeded')
    // router.push({
    //   pathname: '/account_verification',
    //   query: {
    //     n: encode64(login_id),
    //   },
    // })
    amplifyConfigure()
    return user
  } catch (error) {
    amplifyConfigure()
    handleError<SignupInputs>(error, 'admin sign up failed')
    return ''
  }
}

const cognitoAdmin = {
  signup,
}

export default cognitoAdmin
