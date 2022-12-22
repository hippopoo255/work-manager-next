import { requiredAuthenticatedPaths } from '~/config'

export const isRequiredAuthenticatedPaths = (pathname: string) => {
  const matchedAuthenticatedPaths = requiredAuthenticatedPaths.filter(
    (pattern) => {
      const rule = new RegExp(pattern, 'i')
      return rule.test(pathname)
    }
  )
  return matchedAuthenticatedPaths.length > 0
}
