/* eslint-disable import/no-anonymous-default-export */
import { MessageParams } from 'yup/lib/types'

const labelText = ({ label }: Pick<MessageParams, 'label'>) => {
  return label ? `${label}` : ''
}

export default {
  mixed: {
    default: (params: MessageParams) => `${labelText(params)}の値が無効です`,
    required: () => `必須項目です`,
    oneOf: (params: MessageParams & { values: any }) =>
      `${labelText(params)}次の値のいずれかでなければなりません:${
        params.values
      }`,
    notOneOf: (params: MessageParams & { values: any }) =>
      `${labelText(params)}次の値のいずれかであってはなりません:${
        params.values
      }`,
    notType: `形式が違います`,
    defined: ``,
  },
  string: {
    length: ({ label, length }: MessageParams & { length: number }) =>
      `${labelText({ label })}${length}文字で入力してください`,
    min: (params: MessageParams & { min: number }) =>
      // `${labelText(params)}少なくとも${params.min}文字でなければなりません`,
      `${params.min}文字以上で入力してください`,
    max: (params: MessageParams & { max: number }) =>
      `${params.max}文字以下で入力してください`,
    matches: () => `形式が正しくありません`,
    email: (params: MessageParams & { regex: RegExp }) =>
      `メールアドレスの形式が正しくありません`,
    url: (params: MessageParams & { regex: RegExp }) =>
      `URLの形式が正しくありません`,
    uuid: (params: MessageParams & { regex: RegExp }) =>
      `UUIDの形式が正しくありません`,
    trim: (params: MessageParams) => `前後のスペースを削除してください`,
    lowercase: (params: MessageParams) => `小文字で入力してください`,
    uppercase: (params: MessageParams) => `大文字で入力してください`,
  },
  number: {
    min: (params: MessageParams & { min: number }) =>
      `${params.min}以上で入力してください`,
    max: (params: MessageParams & { max: number }) =>
      `${params.max}以下で入力してください`,
    lessThan: (params: MessageParams & { less: number }) =>
      `${params.less}より小さい値を入力してください`,
    moreThan: (params: MessageParams & { more: number }) =>
      `${params.more}より大きい値を入力してください`,
    positive: (params: MessageParams & { more: number }) =>
      `正の数を入力してください`,
    negative: (params: MessageParams & { less: number }) =>
      `負の数を入力してください`,
    integer: (params: MessageParams) => `整数を入力してください`,
  },
  date: {
    min: (params: MessageParams & { min: Date | string }) =>
      `${params.min}より後の日付を入力してください`,
    max: (params: MessageParams & { max: Date | string }) =>
      `${params.max}より前の日付を入力してください`,
  },
  boolean: {
    // isValue: (params: MessageParams) => `${labelText(params)}値が必要です`,
    isValue: (params: MessageParams) => `値が必要です`,
  },
  object: {
    noUnknown: (params: MessageParams) =>
      `指定されていない項目を含めることはできません`,
  },
  array: {
    length: (params: MessageParams & { length: number }) =>
      `${params.length}個が必要です`,
    min: (params: MessageParams & { min: number }) =>
      `${params.min}個以上の項目が必要です`,
    max: (params: MessageParams & { max: number }) =>
      `${params.max}個以下の項目が必要です`,
  },
}
