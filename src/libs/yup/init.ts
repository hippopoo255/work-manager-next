import { i18n } from 'next-i18next'
import * as Yup from 'yup'
import { yupMessage as ja } from '~/config/locales/ja'

export const yup = (): typeof Yup => {
  if (i18n?.language === 'ja') {
    Yup.setLocale(ja)
  }
  return Yup
}

export default Yup
