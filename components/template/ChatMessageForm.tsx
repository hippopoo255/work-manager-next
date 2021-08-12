import React, { useState, useEffect } from 'react'
import { FormDialog } from '@/components/organisms'
import { useForm, Controller } from 'react-hook-form'
import { Grid, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { ChatMessageInputs, MemberExtInputs } from '@/interfaces/form/inputs'
import { ChatMessageSubmit } from '@/interfaces/form/submit'
import { ChatMessage } from '@/interfaces/models'
import { getRequest, requestUri } from '@/api'
import { FormErrorMessage } from '@/components/atoms'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

export type Props = {
  defaultValues: ChatMessageInputs
  open: boolean
  setOpen: (isOpen: boolean) => void
  req: (submitData: ChatMessageSubmit, id: number) => Promise<ChatMessage>
  onSuccess: (response: ChatMessage) => void
  saveAction: 'create' | 'update'
  dialogTitle: string
}

const ChatRoomForm = ({
  defaultValues,
  open,
  setOpen,
  req,
  onSuccess,
  dialogTitle,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<ChatMessageInputs>({
    defaultValues,
  })
  const router = useRouter()

  useEffect(() => {
    setValue('id', defaultValues.id)
    setValue('body', defaultValues.body)
    setValue('written_by', defaultValues.written_by)
  }, [setValue, defaultValues])

  const handleSave = async (data: ChatMessageInputs) => {
    setLoading(true)
    const submitData = {
      body: data.body,
      written_by: data.written_by,
    }
    await req(submitData, data.id!)
      .then((newChatRoom) => {
        setOpen(false)
        reset()
        onSuccess(newChatRoom)
      })
      .catch((err) => {
        if (err.status === 422) {
          const errBody: { [k: string]: string[] } = err.data.errors
          Object.keys(errBody).forEach((key) => {
            setError('body', {
              type: 'invalid',
              message: errBody['body'][0],
            })
          })
        } else if (err.status === 401) {
          router.push('/login')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

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
