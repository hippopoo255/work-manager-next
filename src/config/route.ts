// Define paths that don't require authentication
export const requireGuestPaths: string[] = [
  '/signin',
  '/signup',
  'forgot_password',
]
export const requiredAuthenticatedPaths: RegExp[] = [/^\/mypage(\/.*)?$/]
