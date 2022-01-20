import React from 'react'
import { useRouter } from 'next/router'
import { ja, en } from '@/locales'

const useLocale = () => {
  const { locale } = useRouter()
  const t = locale === 'en' ? en : ja

  return {
    locale,
    t,
  }
}

export default useLocale
