import { AxiosRequestConfig } from 'axios'
import { postRequestToApiGateway } from '@/lib/axios'

type UploadedFileSrcType = {
  src: string[]
}
type UploadedFileHeadersType = {
  'Access-Control-Allow-Credentials': boolean
  'Access-Control-Allow-Headers': string
  'Access-Control-Allow-Methods': string
  'Access-Control-Allow-Origin'?: string
  'content-type': string
}
export type UploadedFileResponseType = {
  body: UploadedFileSrcType
  headers: UploadedFileHeadersType
  statusCode: number
}

const uploadFile = async (file: File, path: string = '/blog_asset') => {
  const submitData = new FormData()
  submitData.append('thumbnail', file)
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  const d = await postRequestToApiGateway<UploadedFileResponseType>(
    path,
    submitData,
    config
  )
  return d
}

export default uploadFile
