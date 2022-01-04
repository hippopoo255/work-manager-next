import React, { useState, useCallback } from 'react'
import { uploadFile } from '@/lib/file'
import { UploadedFileResponseType } from '@/lib/file/upload'

const useImageMarkedLine = () => {
  const [imageMarkedLine, setImageMarkedLine] = useState<string>('')

  const imageUploadFunction = useCallback(async (file: File) => {
    await uploadFile(file).then((response: UploadedFileResponseType) => {
      if ('body' in response) {
        const uploadedImageUrl = response.body.src[0]
        const fileName = uploadedImageUrl.split('/blog_asset/')[1]
        const markdownImageText = `![${fileName}](${uploadedImageUrl})`
        setImageMarkedLine(markdownImageText)
      } else {
        setImageMarkedLine('')
      }
    })
  }, [])

  return {
    imageMarkedLine,
    setImageMarkedLine,
    imageUploadFunction,
  }
}

export default useImageMarkedLine
