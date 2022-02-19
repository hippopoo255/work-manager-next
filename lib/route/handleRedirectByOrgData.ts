import router from 'next/router'

export default function handleRedirectByOrgData(hasOrgData: boolean = false) {
  if (router.pathname === '/organization/create' && hasOrgData) {
    router.push('/mypage')
  }
  if (!(router.pathname === '/organization/create' || hasOrgData)) {
    router.push('/organization/create')
  }
}
