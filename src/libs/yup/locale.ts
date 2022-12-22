import * as yup from 'yup'
import { MessageParams } from 'yup/lib/types'

const labelText = ({ label }: Pick<MessageParams, 'label'>) => {
  return label ? `${label}は` : ''
}

const jpConfig = {
  mixed: {
    default: (params: MessageParams) => `${labelText(params)}無効です`,
    required: (params: MessageParams) =>
      `${labelText(params)}必須の入力項目です`,
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
      `${labelText({ label })}${length}文字でなければなりません`,
    min: (params: MessageParams & { min: number }) =>
      `${labelText(params)}少なくとも${params.min}文字でなければなりません`,
    max: (params: MessageParams & { max: number }) =>
      `${labelText(params)}最大${params.max}文字でなければなりません`,
    matches: (params: MessageParams & { regex: RegExp }) =>
      `${labelText(params)}次の形式と一致する必要があります: "${params.regex}"`,
    email: (params: MessageParams & { regex: RegExp }) =>
      `${labelText(params)}メールアドレス形式である必要があります`,
    url: (params: MessageParams & { regex: RegExp }) =>
      `${labelText(params)}有効なURLでなければなりません`,
    uuid: (params: MessageParams & { regex: RegExp }) =>
      `${labelText(params)}有効なUUIDでなければなりません`,
    trim: (params: MessageParams) =>
      `${labelText(params)}前後にスペースを入れてはいけません`,
    lowercase: (params: MessageParams) =>
      `${labelText(params)}小文字でなければなりません`,
    uppercase: (params: MessageParams) =>
      `${labelText(params)}大文字でなければなりません`,
  },
  number: {
    min: (params: MessageParams & { min: number }) =>
      `${labelText(params)}${params.min}以上である必要があります`,
    max: (params: MessageParams & { max: number }) =>
      `${labelText(params)}${params.max}以下でなければなりません`,
    lessThan: (params: MessageParams & { less: number }) =>
      `${labelText(params)}${params.less}より小さくなければなりません`,
    moreThan: (params: MessageParams & { more: number }) =>
      `${labelText(params)}${params.more}より大きくなければなりません`,
    positive: (params: MessageParams & { more: number }) =>
      `${labelText(params)}正の数でなければなりません`,
    negative: (params: MessageParams & { less: number }) =>
      `${labelText(params)}負の数でなければなりません`,
    integer: (params: MessageParams) =>
      `${labelText(params)}整数でなければなりません`,
  },
  date: {
    min: (params: MessageParams & { min: Date | string }) =>
      `${labelText(params)}${params.min}より後でなければなりません`,
    max: (params: MessageParams & { max: Date | string }) =>
      `${labelText(params)}${params.max}より前でなければなりません`,
  },
  boolean: {
    isValue: (params: MessageParams) => `${labelText(params)}値が必要です`,
  },
  object: {
    noUnknown: (params: MessageParams) =>
      `${labelText(
        params
      )}オブジェクトシェイプで指定されていないキーを含めることはできません`,
  },
  array: {
    length: (params: MessageParams & { length: number }) =>
      `${labelText(params)}${params.length}個が必要です`,
    min: (params: MessageParams & { min: number }) =>
      `${labelText(params)}${params.min}個以上の項目が必要です`,
    max: (params: MessageParams & { max: number }) =>
      `${labelText(params)}${params.max}個以下の項目が必要です`,
  },
}

yup.setLocale(jpConfig)

export default yup
