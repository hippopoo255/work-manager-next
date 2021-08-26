import React, { useState, useEffect } from 'react'
import { FormDialog } from '@/components/organisms'
import { useForm, Controller } from 'react-hook-form'
import { Grid, TextField, IconButton, Tooltip, Paper } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import CancelIcon from '@material-ui/icons/Cancel'
import { ChatMessageInputs, MemberExtInputs } from '@/interfaces/form/inputs'
import { ChatMessageSubmit } from '@/interfaces/form/submit'
import { ChatMessage } from '@/interfaces/models'
import { FormErrorMessage } from '@/components/atoms'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { mergeWithoutDuplicate } from '@/lib/util'

const usePaperStyles = makeStyles((theme: Theme) =>
  createStyles({
    facePaper: {
      cursor: 'pointer',
      overflow: 'hidden',
    },
    output: {
      zIndex: 1,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      height: 0,
      paddingBottom: '100%',
      overflow: 'hidden',
    },
    src: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate3d(-50%, -50%, 0)',
      maxWidth: 300,
    },
    trash: {
      position: 'absolute',
      bottom: -30,
      right: 0,
      color: theme.palette.grey[600],
    },
    fill: {
      position: 'relative',
      top: 0,
      left: 0,
      width: '100%',
      height: 0,
      paddingBottom: '100%',
      background: theme.palette.grey[200],
    },
    mark: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  })
)

type FacePaperProps = {
  preview: any
}

const FacePaper = ({ preview }: FacePaperProps) => {
  const classes = usePaperStyles()

  return (
    <Paper className={classes.facePaper} square>
      {!!preview.val ? (
        <output className={classes.output}>
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview.val}
              alt={'サムネイル画像'}
              className={classes.src}
            />
          }
        </output>
      ) : (
        <Tooltip title={'アップロード'}>
          <div className={classes.fill}>
            <div className={classes.mark}>
              <IconButton
                color="default"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </div>
          </div>
        </Tooltip>
      )}
    </Paper>
  )
}

export type Props = {
  defaultValues: ChatMessageInputs
  open: boolean
  setOpen: (isOpen: boolean) => void
  req: (submitData: ChatMessageSubmit, id: number) => Promise<ChatMessage>
  onSuccess: (response: ChatMessage) => void
  saveAction: 'create' | 'update'
  dialogTitle: string
  imageIds?: number[]
}
const useStyles = makeStyles({
  paperWrap: {
    position: 'relative',
  },
  clearIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
  dispreview: {
    display: 'none',
  },
})

const ChatRoomForm = ({
  defaultValues,
  open,
  setOpen,
  req,
  onSuccess,
  dialogTitle,
  imageIds,
}: Props) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [preview, setPreview] = useState<{ val: any }[]>([
    { val: null },
    { val: null },
    { val: null },
    { val: null },
  ])
  const [files, setFiles] = useState<{ val: any }[]>([
    { val: null },
    { val: null },
    { val: null },
    { val: null },
  ])

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ChatMessageInputs>({
    defaultValues,
  })
  const router = useRouter()

  const handleSave = async (data: ChatMessageInputs) => {
    setLoading(true)
    const submitData = new FormData()
    files.forEach((file: { val: any }, index: number) => {
      if (!!file.val) {
        submitData.append(`files[${index}]`, file.val)
      }
    })
    data.delete_flags.forEach((id: number | null, index: number) => {
      if (id !== null) {
        submitData.append(`delete_flags[${index}]`, String(id))
      }
    })
    submitData.append('body', data.body)
    submitData.append('written_by', String(data.written_by))
    await req(submitData, data.id!)
      .then((newChatRoom) => {
        setOpen(false)
        reset()
        onSuccess(newChatRoom)
      })
      .catch((err) => {
        if (err.status === 422) {
          const errBody: { [k: string]: string[] } = err.data.errors
          Object.keys(errBody).forEach((key: any) => {
            if (key.match(/^files\.[0-3]$/g)) {
              const inputKey: keyof ChatMessageInputs = key.replace(
                /^files\.([0-3])$/g,
                (match: string, p1: string, offset: number, string: string) =>
                  `previews.${p1}`
              )
              setError(inputKey, {
                type: 'invalid',
                message: errBody[key][0],
              })
            } else {
              setError(key, {
                type: 'invalid',
                message: errBody[key][0],
              })
            }
          })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handlePreview = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    clearErrors(`previews.${index}`)
    if (event.target.files!.length === 0) {
      return false
    }
    if (!event.target.files![0].type.match('image.*')) {
      return false
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview((prev: { val: any }[]) => {
        let newPreview = [...prev]
        newPreview.splice(index, 1, { val: e.target!.result })
        return [...newPreview]
      })
    }

    reader.readAsDataURL(event.target.files![0])

    setFiles((prev: { val: any }[]) => {
      let newFiles = [...prev]
      newFiles.splice(index, 1, { val: event.target.files![0] })
      return [...newFiles]
    })
  }

  const handleClear = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    clearErrors(`previews.${index}`)
    const imageIds = getValues('image_ids')
    if (imageIds !== undefined) {
      setValue(
        'delete_flags',
        mergeWithoutDuplicate<number | null>(getValues('delete_flags'), [
          imageIds[index],
        ])
      )
    }
    setPreview((prev: { val: any }[]) => {
      let newPreview = [...prev]
      newPreview.splice(index, 1, { val: null })
      return [...newPreview]
    })
    setFiles((prev: { val: any }[]) => {
      let newFiles = [...prev]
      newFiles.splice(index, 1, { val: null })
      return [...newFiles]
    })
  }

  useEffect(() => {
    setValue('id', defaultValues.id)
    setValue('body', defaultValues.body)
    setValue('written_by', defaultValues.written_by)
    setFiles([{ val: null }, { val: null }, { val: null }, { val: null }])
    setPreview((prev: { val: any }[]) => {
      let newPreview = [
        { val: null },
        { val: null },
        { val: null },
        { val: null },
      ]
      defaultValues.previews.forEach((preview, index) => {
        newPreview.splice(index, 1, { val: preview })
      })
      return [...newPreview]
    })
    setValue('delete_flags', defaultValues.delete_flags)
    if (defaultValues.image_ids !== undefined) {
      setValue('image_ids', defaultValues.image_ids)
    }
  }, [setValue, defaultValues])

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        dialogTitle={dialogTitle}
        onSubmit={handleSubmit(handleSave)}
        isCircular
        loading={loading}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {files.length &&
                files.map((file, index) => (
                  <Grid item xs={6} md={3} key={`files.${index}`}>
                    <div className={classes.paperWrap}>
                      <input
                        type="file"
                        accept="image/svg+xml,.png,.jpg,.jpeg,.gif"
                        style={{ display: 'none' }}
                        id={`image_${index}`}
                        name={`images.${index}`}
                        multiple
                        onChange={handlePreview.bind(null, index)}
                      />
                      <label htmlFor={`image_${index}`}>
                        <FacePaper preview={preview[index]} />
                      </label>
                      {!!preview[index].val && (
                        <Tooltip title={'削除'}>
                          <IconButton
                            size={'small'}
                            color={'default'}
                            className={classes.clearIcon}
                            onClick={handleClear.bind(null, index)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
                    {!!errors.previews && (
                      <FormErrorMessage msg={errors.previews[index]?.message} />
                    )}
                  </Grid>
                ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="body"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'メッセージは必須です',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  label="メッセージ"
                  variant="outlined"
                  multiline
                  minRows={1}
                  maxRows={4}
                  error={!!errors.body}
                  fullWidth
                />
              )}
            />
            <p style={{ minHeight: 20 }}>
              {!!errors.body && <FormErrorMessage msg={errors.body.message} />}
            </p>
          </Grid>
        </Grid>
      </FormDialog>
    </>
  )
}

ChatRoomForm.propTypes = {
  saveAction: PropTypes.string,
  dialogTitle: PropTypes.string,
}

ChatRoomForm.defaultProps = {
  saveAction: 'update',
  dialogTitle: 'チャットルームを追加',
}

export default ChatRoomForm
