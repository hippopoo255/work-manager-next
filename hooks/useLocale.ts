import React from 'react'
import { useRouter } from 'next/router'
import ja from '@/locales/ja'
import en from '@/locales/en'

const useLocale = () => {
  const { locale } = useRouter()
  const t = locale === 'en' ? en : ja

  return {
    locale,
    t,
  }
}

export default useLocale
