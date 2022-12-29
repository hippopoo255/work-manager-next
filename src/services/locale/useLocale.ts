import { useRouter } from 'next/router'
// import { ja, en } from '~/config/locales'

const useLocale = () => {
  const router = useRouter()
  // const t = router.locale === 'en' ? en : ja
  const changeLocale = (locale: string) => {
    router.push(router.pathname, router.pathname, { locale })
  }

  return {
    // locale: router.locale,
    changeLocale,
    // t,
  }
}

export default useLocale
