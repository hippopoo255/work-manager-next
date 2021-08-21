import { ProcessFlag } from '@/interfaces/enums/ProcessFlag'

export const drawerWidth: number = 250
export const chatRoomListWidth: number = 360
export const SITE_TITLE: string =
  process.env.NEXT_PUBLIC_SITE_NAME || 'Next App'
export const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api'
export const STORAGE_URL: string =
  process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8080/storage'
export const PROCESS_FLAG: { [k: string]: ProcessFlag } = {
  updateFlag: 1,
  deleteFlag: 2,
}

export function toStrData(date: Date): string {
  const year = date.getFullYear()
  const month = `0${date.getMonth() + 1}`.slice(-2)
  const day = `0${date.getDate()}`.slice(-2)
  const hour = `0${date.getHours()}`.slice(-2)
  const minute = `0${date.getMinutes()}`.slice(-2)
  return `${year}/${month}/${day} ${hour}:${minute}`
}

export function toStrLabel(date: Date): string {
  let year: string = ''
  if (date.getFullYear() !== new Date().getFullYear()) {
    year = `${date.getFullYear()}/`.slice(-3)
  }
  const month = `${date.getMonth() + 1}/`
  const day = `${date.getDate()}`
  const dayOfWeek = date.getDay() // 曜日(数値)
  const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeek] // 曜日(日本語表記)
  const hour = `${date.getHours()}:`
  const minute = `0${date.getMinutes()}`.slice(-2)
  return `${year}${month}${day}(${dayOfWeekStr}) ${hour}${minute}`
}

export function toStrFormalLabel(date: Date): string {
  const year = `${date.getFullYear()}年`
  const month = `${date.getMonth() + 1}月`
  const day = `${date.getDate()}日`
  const dayOfWeek = date.getDay() // 曜日(数値)
  const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeek] // 曜日(日本語表記)
  const hour = `${date.getHours()}:`
  const minute = `0${date.getMinutes()}`.slice(-2)
  return `${year}${month}${day}(${dayOfWeekStr}) ${hour}${minute}`
}

export function postTiming(createDate: Date) {
  const now = new Date()
  const diff = now.getTime() - createDate.getTime()
  const minutes = Math.floor(diff / 1000 / 60)
  const hours = Math.floor(diff / 1000 / 60 / 60)
  const days = Math.floor(diff / 1000 / 60 / 60 / 24)

  if (minutes < 1) {
    return 'たった今'
  } else if (hours < 1) {
    return `約${minutes}分前`
  } else if (days < 1) {
    return `約${hours}時間前`
  } else if (now.getFullYear() > createDate.getFullYear()) {
    const year = createDate.getFullYear()
    const month = createDate.getMonth() + 1
    const date = createDate.getDate()
    return `${year}/${month}/${date}`
  } else {
    const month = createDate.getMonth() + 1
    const date = createDate.getDate()
    const hour = createDate.getHours()
    const minute = `0${createDate.getMinutes()}`.slice(-2)
    return `${month}/${date} ${hour}:${minute}`
  }
}

export const strPatterns = {
  password: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[=\w\-\?]{8,64}$/,
  email: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/,
  katakana: /^[ァ-ヴーｦ-ﾟ]+$/,
  confirm: (compare: string) =>
    new RegExp(`^${compare.replace(/\?/g, '\\?')}$`),
}
