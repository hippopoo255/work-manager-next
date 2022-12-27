import { Amplify } from 'aws-amplify'
import { AWS_COGNITO_CONFIG, AWS_ADMIN_COGNITO_CONFIG } from '~/config/auth'

export const amplifyConfigure = () => {
  Amplify.configure({
    Auth: {
      // REQUIRED - Amazon Cognito Region
      region: AWS_COGNITO_CONFIG.region,
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: AWS_COGNITO_CONFIG.UserPoolId,
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: AWS_COGNITO_CONFIG.ClientId,
    },
    ssr: true,
  })
}

export const amplifyAdminConfigure = () => {
  Amplify.configure({
    Auth: {
      // REQUIRED - Amazon Cognito Region
      region: AWS_ADMIN_COGNITO_CONFIG.region,
      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: AWS_ADMIN_COGNITO_CONFIG.UserPoolId,
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: AWS_ADMIN_COGNITO_CONFIG.ClientId,
    },
    ssr: true,
  })
}
