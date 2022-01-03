import { uploadFile } from '@/lib/file'

export const MDE_BODY_HEIGHT = 500
export const MDE_BODY_OUT_SPACE = 20 // padding10px * 2
export const MDE_BODY_BORDER_SIZE = 2 // border1px * 2
export const MDE_TOOLBAR_HEIGHT = 50
export const MDE_TOOLBAR_MULTIPLE_HEIGHT = 80
export const MDE_STATUSBAR_HEIGHT = 33
export const MDE_SHOW_TOOLBAR = true
export const MDE_SHOW_STATUSBAR = false

export const MDE_MAX_HEIGHT =
  MDE_BODY_HEIGHT +
  MDE_BODY_OUT_SPACE +
  MDE_BODY_BORDER_SIZE +
  (MDE_SHOW_TOOLBAR ? MDE_TOOLBAR_MULTIPLE_HEIGHT : 0) +
  (MDE_SHOW_STATUSBAR ? MDE_STATUSBAR_HEIGHT : 0)

export const imageUploadFunction = async (file: File) => {
  const d = await uploadFile(file)
  if ('body' in d) {
    const fileName = d.body.src.split('/blog_asset/')[1]
    const markdownImageValue = `![${fileName}](${d.body.src})`
    return markdownImageValue
  }
  return ''
}
