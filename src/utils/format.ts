import { Buffer } from 'buffer'
import { TFunction } from 'next-i18next'

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
  userId: /^\w{8,64}$/,
  password: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[=\w\-\?]{8,64}$/,
  email: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/,
  postal: /^[0-9]{5,7}$/,
  tel: /^[0-9]{10,11}$/,
  katakana: /^[ァ-ヴーｦ-ﾟ]+$/,
  confirm: (compare: string) =>
    new RegExp(`^${compare.replace(/\?/g, '\\?')}$`),
}

export const passwordRuleSuggestion = (t: TFunction) => {
  const rule = t('rule.password', { ns: 'form' })
  return rule.replace(/\//g, '\n')
}

// export const getSortParams = (data: SearchMeetingRecordInputs) => {
//   let queryParamStr = ''
//   Object.keys(data).forEach((key) => {
//     if (data[key] === 'null' || !data[key]) {
//     } else if (key === 'meeting_date') {
//       queryParamStr += `&${key}=${data[key].replace(/\//g, '-')}`
//     } else {
//       queryParamStr += `&${key}=${String(data[key])}`
//     }
//   })
//   queryParamStr = queryParamStr.replace(/^&/, '?')
//   return queryParamStr
// }

// export const handlePageUri = (currentUri: string, args: SortParam<any>) => {
//   const baseUri = currentUri.replace(/\?.+$/, '')
//   // page、sort_key(、order_by)パラメータを付け替え
//   let uri = currentUri.replace(/[\?&](page|sort_key)=.+/, '')
//   uri += `&page=${args.page}&sort_key=${String(args.sort_key)}&order_by=${
//     args.order_by
//   }`
//   return uri.replace(`${baseUri}&`, `${baseUri}?`)
// }
//
// export const mine = <T = number>(by: T, me: T) => by === me
//
// export const mergeWithoutDuplicate = <T>(arr1: T[], arr2: T[]): T[] => {
//   let arr = arr1.concat(arr2)
//   let uniqueArr = []
//
//   for (let i of arr) {
//     if (uniqueArr.indexOf(i) === -1) {
//       uniqueArr.push(i)
//     }
//   }
//   return uniqueArr
// }

export const arrToGqlStr = (arg: any[]) => {
  let tempStr = JSON.stringify(arg)
  tempStr = tempStr.replace(/{"/g, '{')
  tempStr = tempStr.replace(/":/g, ':')
  tempStr = tempStr.replace(/,"/g, ',')
  const gqlText = tempStr
  return gqlText
}

export const encode64 = (str: string) => Buffer.from(str).toString('base64')
export const decode64 = (str: string) => Buffer.from(str, 'base64').toString()
