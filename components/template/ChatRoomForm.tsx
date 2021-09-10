import React, { useState, useEffect } from 'react'
import { FormDialog } from '@/components/organisms'
import { useForm, Controller } from 'react-hook-form'
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Chip,
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { ChatRoomInputs, MemberExtInputs } from '@/interfaces/form/inputs'
import { ChatRoomSubmit } from '@/interfaces/form/submit'
import { User, ChatRoom } from '@/interfaces/models'
import { getRequest, requestUri } from '@/api'
import { FormErrorMessage } from '@/components/atoms'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

export type Props = {
  defaultValues: ChatRoomInputs
  fixedMember: MemberExtInputs[]
  sharedBy: number
  open: boolean
  setOpen: (isOpen: boolean) => void
  req: (submitData: ChatRoomSubmit) => Promise<ChatRoom>
  onSuccess: (response: ChatRoom) => void
  saveAction: 'create' | 'update'
  dialogTitle: string
}

const ChatRoomForm = ({
  defaultValues,
  fixedMember,
  sharedBy,
  open,
  setOpen,
  req,
  onSuccess,
  saveAction,
  dialogTitle,
}: Props) => {
  // const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [memberList, setMemberList] = useState<MemberExtInputs[]>([])
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    clearErrors,
    setError,
    reset,
    formState: { errors },
  } = useForm<ChatRoomInputs>({
    defaultValues,
  })
  const selectedMembers = watch('members', fixedMember)
  const router = useRouter()

  useEffect(() => {
    const fetchMember = async () => {
      await getRequest<User[]>(requestUri.user.list).then((users: User[]) => {
        const dataList: MemberExtInputs[] = users.map((u) => ({
          id: u.id,
          full_name: u.full_name,
          is_editable: true,
          shared_by: sharedBy,
        }))
        setMemberList(dataList)
      })
    }
    fetchMember()
  }, [])

  useEffect(() => {
    setValue('name', defaultValues.name)
    setValue('created_by', defaultValues.created_by)
    setValue('members', defaultValues.members)
  }, [setValue, defaultValues])

  const handleMembers = (
    event: React.ChangeEvent<{}>,
    newValue: MemberExtInputs[]
  ) => {
    setValue('members', [
      ...fixedMember,
      ...newValue.filter(
        (option: MemberExtInputs) => fixedMember.indexOf(option) === -1
      ),
    ])
    if (newValue.length > 0) {
      clearErrors('members')
    }
  }

  const handleCheck = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(
      'members',
      selectedMembers.map((member: MemberExtInputs) => {
        if (member.id === id) {
          member.is_editable = !member.is_editable
        }
        return member
      })
    )
  }

  const handleSave = async (data: ChatRoomInputs) => {
    setLoading(true)
    const submitMember: ChatRoomSubmit['members'] = {}
    data.members.forEach((member) => {
      submitMember[member.id] = {
        is_editable: !!member.is_editable,
        shared_by: sharedBy,
      }
    })
    const submitData = {
      created_by: data.created_by,
      name: data.name,
      members: submitMember,
    }
    await req(submitData)
      .then((newChatRoom) => {
        setOpen(false)
        reset()
        onSuccess(newChatRoom)
      })
      .catch((err) => {
        if (err.status === 422) {
          const errBody: { [k: string]: string[] } = err.data.errors
          Object.keys(errBody).forEach((key) => {
            setError(key, {
              type: 'invalid',
              message: errBody[key][0],
            })
          })
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
              name="name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'ルーム名は必須です',
                },
                maxLength: {
                  value: 80,
                  message: 'ルーム名は80文字以内で入力してください',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  label="チャットルーム名"
                  variant="outlined"
                  error={!!errors.name}
                  fullWidth
                />
              )}
            />
            <p style={{ minHeight: 20 }}>
              {!!errors.name && <FormErrorMessage msg={errors.name.message} />}
            </p>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="members"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: '参加者の入力は必須です',
                },
                minLength: {
                  value: 1,
                  message: '参加者の人数を最低1名入力してください',
                },
              }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  multiple
                  id="chatroom_members_field"
                  options={memberList}
                  value={selectedMembers}
                  defaultValue={getValues('members')}
                  onChange={handleMembers}
                  getOptionLabel={(option) => option.full_name}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        key={`member_${index}`}
                        label={option.full_name}
                        {...getTagProps({ index })}
                        disabled={fixedMember.indexOf(option) !== -1}
                      />
                    ))
                  }
                  style={{
                    width: '100%',
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="ルーム参加者"
                      variant="outlined"
                      placeholder="＋"
                      required
                      error={!!errors.members}
                    />
                  )}
                />
              )}
            />
            <p style={{ minHeight: 20 }}>
              {!!errors.members && (
                <FormErrorMessage
                  msg={
                    /* @ts-ignore */
                    errors.members.message
                  }
                />
              )}
            </p>
          </Grid>
          <Grid item xs={12}>
            {selectedMembers.length > 0 &&
              selectedMembers.map((member) => (
                <FormControlLabel
                  key={member.id}
                  control={
                    <Checkbox
                      checked={!!member.is_editable!}
                      onChange={handleCheck.bind(null, member.id)}
                      name="member"
                      color="primary"
                    />
                  }
                  label={`${member.full_name}さんに編集権限を付与する`}
                />
              ))}
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
