import { useRestApi } from '@/hooks'
import { AxiosRequestConfig } from 'axios'
import { UploadedFileResponseType } from '@/lib/file/upload'
import { API_TEMP_URL } from '@/lib/util'

const useFileUpload = () => {
  const { postMethod } = useRestApi()

  const uploadFile = async (file: File, path: string = '/blog_asset') => {
    const submitData = new FormData()
    submitData.append('thumbnail', file)
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    const d = await postMethod<UploadedFileResponseType>(
      path,
      submitData,
      undefined,
      config,
      API_TEMP_URL
    )
    return d
  }
  return {
    uploadFile,
  }
}

export default useFileUpload
