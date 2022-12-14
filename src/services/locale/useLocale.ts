import { useRouter } from 'next/router'
import { ja, en } from '~/config/locales'

const useLocale = () => {
  const { locale } = useRouter()
  const t = locale === 'en' ? en : ja

  return {
    locale,
    t,
  }
}

export default useLocale
