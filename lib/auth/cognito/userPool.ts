import { awsConfiguration } from './config'
import { CognitoUserPool } from 'amazon-cognito-identity-js'

const userPool = new CognitoUserPool({
  UserPoolId: awsConfiguration.UserPoolId,
  ClientId: awsConfiguration.ClientId,
})

export default userPool
