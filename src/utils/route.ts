import {
  requiredAuthenticatedPaths,
  requiredUnOrganizedPaths,
} from '~/config/route'

export const isRequiredAuthenticatedPaths = (pathname: string) => {
  const matchedAuthenticatedPaths = requiredAuthenticatedPaths.filter(
    (pattern) => {
      const rule = new RegExp(pattern, 'i')
      return rule.test(pathname)
    }
  )
  return matchedAuthenticatedPaths.length > 0
}

export const isRequiredUnOrganizedPaths = (pathname: string) => {
  const matchedUnOrganizedPaths = requiredUnOrganizedPaths.filter((pattern) => {
    const rule = new RegExp(pattern, 'i')
    return rule.test(pathname)
  })
  return matchedUnOrganizedPaths.length > 0
}
