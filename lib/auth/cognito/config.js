const AWS_COGNITO_REGION =
  process.env.NEXT_PUBLIC_AWS_COGNITO_REGION || 'ap-northeast-1'
const AWS_COGNITO_IDENTITY_POOL_ID =
  process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID || ''
const AWS_COGNITO_USER_POOL_ID =
  process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID || ''
const AWS_COGNITO_CLIENT_ID =
  process.env.NEXT_PUBLIC_AWS_COGNITO_CLIENT_ID || ''

export const awsConfiguration = {
  region: AWS_COGNITO_REGION,
  IdentityPoolId: AWS_COGNITO_IDENTITY_POOL_ID,
  UserPoolId: AWS_COGNITO_USER_POOL_ID,
  ClientId: AWS_COGNITO_CLIENT_ID,
}

export const cognitoTestUser = {
  name: process.env.NEXT_PUBLIC_AWS_COGNITO_TEST_USER_NAME || '',
  email: process.env.NEXT_PUBLIC_AWS_COGNITO_TEST_USER_EMAIL || '',
  password: process.env.NEXT_PUBLIC_AWS_COGNITO_TEST_USER_PASSWORD || '',
}
