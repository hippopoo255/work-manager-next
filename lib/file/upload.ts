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
