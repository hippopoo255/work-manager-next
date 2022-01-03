import { postRequestToApiGateway, Config } from '@/lib/axios'

type UploadedFileSrcType = {
  src: string
}
type UploadedFileHeadersType = {
  'Access-Control-Allow-Credentials': boolean
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
  'Access-Control-Allow-Methods': 'OPTIONS,POST'
  'Access-Control-Allow-Origin': 'http://localhost:3000'
  'content-type': 'application/json'
}
export type UploadedFileResponseType = {
  body: UploadedFileSrcType
  headers: UploadedFileHeadersType
  statusCode: number
}

const uploadFile = async (file: File) => {
  const submitData = new FormData()
  submitData.append('thumbnail', file)
  const config: Config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  const d = await postRequestToApiGateway<UploadedFileResponseType>(
    '/blog_asset',
    submitData,
    config
  )
  return d
}

export default uploadFile
