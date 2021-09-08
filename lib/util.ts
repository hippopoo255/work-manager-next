import { ProcessFlag } from '@/interfaces/enums/ProcessFlag'
import { SearchMeetingRecordInputs } from '@/interfaces/form/inputs'
import { SortParam } from '@/interfaces/table'
import { SearchInputs } from '@/interfaces/form/inputs'
export const drawerWidth: number = 250
export const drawerClosingWidth: number = 65
export const chatRoomListWidth: number = 320
export const chatMainWidth: number = 640
export const COLLAPSE_COUNT: number = 3
export const SITE_TITLE: string =
  process.env.NEXT_PUBLIC_SITE_NAME || 'Next App'
export const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL + '/api' || 'http://localhost/api'
export const PUSHER_URL: string =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
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

export function toStrLabel(date: Date, timeless: boolean = false): string {
  let year: string = ''
  if (date.getFullYear() !== new Date().getFullYear()) {
    year = `${date.getFullYear()}/`.slice(-3)
  }
  const month = `${date.getMonth() + 1}/`
  const day = `${date.getDate()}`
  const dayOfWeek = date.getDay() // 曜日(数値)
  const dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeek] // 曜日(日本語表記)
  if (timeless) {
    return `${year}${month}${day}(${dayOfWeekStr})`
  }
  const hour = `${date.getHours()}:`
  const minute = `0${date.getMinutes()}`.slice(-2)
  return `${year}${month}${day}(${dayOfWeekStr}) ${hour}${minute}`
}

export function scheduleLabel(start: Date, end: Date): string {
  const now = new Date()

  if (
    !(
      now.getFullYear() === start.getFullYear() &&
      now.getMonth() === start.getMonth() &&
      now.getDate() === start.getDate()
    )
  ) {
    return toStrLabel(start) + ' - ' + toStrLabel(end)
  }
  if (
    !(
      now.getFullYear() === end.getFullYear() &&
      now.getMonth() === end.getMonth() &&
      now.getDate() === end.getDate()
    )
  ) {
    return toStrLabel(start) + ' - ' + toStrLabel(end)
  }
  const hour = `${start.getHours()}:`
  const minute = `0${start.getMinutes()}`.slice(-2)
  return `${hour}${minute}`
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

export const getSortParams = (data: SearchMeetingRecordInputs) => {
  let queryParamStr = ''
  Object.keys(data).forEach((key) => {
    if (data[key] === 'null' || !data[key]) {
    } else if (key === 'meeting_date') {
      queryParamStr += `&${key}=${data[key].replace(/\//g, '-')}`
    } else {
      queryParamStr += `&${key}=${String(data[key])}`
    }
  })
  queryParamStr = queryParamStr.replace(/^&/, '?')
  return queryParamStr
}

const getCountQueryStr = (count: string) => {
  let queryParamStr = ''
  if (count !== 'null') {
    const arr = count.split(',')
    queryParamStr += `&count[min]=${arr[0]}`
    if (arr.length === 2) {
      queryParamStr += `&count[max]=${arr[1]}`
    }
    return queryParamStr
  }
}

export const handlePageUri = (currentUri: string, args: SortParam<any>) => {
  const baseUri = currentUri.replace(/\?.+$/, '')
  // page、sort_key(、order_by)パラメータを付け替え
  let uri = currentUri.replace(/[\?&](page|sort_key)=.+/, '')
  uri += `&page=${args.page}&sort_key=${String(args.sort_key)}&order_by=${
    args.order_by
  }`
  return uri.replace(`${baseUri}&`, `${baseUri}?`)
}

export const mine = (by: number, me: number) => by === me

export const mergeWithoutDuplicate = <T>(arr1: T[], arr2: T[]): T[] => {
  let arr = arr1.concat(arr2)
  let uniqueArr = []

  for (let i of arr) {
    if (uniqueArr.indexOf(i) === -1) {
      uniqueArr.push(i)
    }
  }
  return uniqueArr
}
