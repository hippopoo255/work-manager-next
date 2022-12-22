import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { AWS_COGNITO_CONFIG } from '~/config/auth'

const userPool = new CognitoUserPool({
  UserPoolId: AWS_COGNITO_CONFIG.UserPoolId,
  ClientId: AWS_COGNITO_CONFIG.ClientId,
})

export default userPool
