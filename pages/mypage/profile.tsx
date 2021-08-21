import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { ProfileLayout } from '@/layouts'
import { MypageTitle, FormErrorMessage } from '@/components/atoms'
import { CircularButton, HelpBox } from '@/components/molecules'
import {
  Avatar,
  Card,
  CardContent,
  CardActions,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
} from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import { User } from '@/interfaces/models'
import { useForm, Controller } from 'react-hook-form'
import { ProfileInputs } from '@/interfaces/form/inputs'
import { ProfileSubmit } from '@/interfaces/form/submit'
import { strPatterns, STORAGE_URL } from '@/lib/util'
import { getRequest, putRequest, requestUri } from '@/api'

const usePaperStyles = makeStyles((theme: Theme) =>
  createStyles({
    facePaper: {
      cursor: 'pointer',
      overflow: 'hidden',
    },
    output: {
      zIndex: 1,
      width: '100%',
      minHeight: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
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
      paddingBottom: '56.25%',
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

const FacePaper = ({ preview }: { preview: any }) => {
  const classes = usePaperStyles()
  return (
    <Tooltip title={'顔写真アップロード'}>
      <Paper className={classes.facePaper}>
        {preview !== null ? (
          <output className={classes.output}>
            {
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt={'サムネイル画像'} />
            }
          </output>
        ) : (
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
        )}
      </Paper>
    </Tooltip>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: 0,
      background: 'linear-gradient(135deg,#fad961,#f76b1c)',
      boxShadow: theme.shadows[2],
    },
    wrap: {
      width: 500,
      maxWidth: '100%',
      margin: '0 auto',
      textAlign: 'center',
    },
    none: {
      display: 'none',
    },
    top: {
      paddingTop: theme.spacing(4),
      // paddingBottom: theme.spacing(4),
    },
    footer: {
      justifyContent: 'center',
      padding: theme.spacing(2),
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      marginBottom: theme.spacing(2),
    },
    err: {
      minHeight: 20,
      textAlign: 'left',
    },
    checkRow: {
      display: 'flex',
      alignItems: 'center',
    },
    subFlag: {
      color: theme.palette.text.secondary,
      '& .MuiTypography-body1': {
        fontSize: theme.typography.body2.fontSize,
      },
    },
  })
)

const Profile = () => {
  const classes = useStyles()
  const router = useRouter()
  const [user, setUser] = useState<User | ''>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [changePassword, setChangePassword] = useState<boolean>(false)
  const [preview, setPreview] = useState<any>(null)
  const [thumbnailData, setThumbnailData] = useState<any>(null)
  const [defaultValues, setDefaultValues] = useState<ProfileInputs>({
    family_name: '',
    given_name: '',
    family_name_kana: '',
    given_name_kana: '',
    change_password: false,
    file: null,
    delete_flag: false,
  })
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ProfileInputs>({
    defaultValues,
  })

  const comparePassword = watch('password', '')

  const handleChangePassword = () => {
    setValue('change_password', !getValues('change_password'))
    clearErrors('current_password')
    clearErrors('password')
    clearErrors('password_confirmation')
    setValue('current_password', '')
    setValue('password', '')
    setValue('password_confirmation', '')
  }

  const handleDeleteFlag = () => {
    setValue('delete_flag', !getValues('delete_flag'))
  }

  const handleUpdate = async (data: ProfileInputs) => {
    if (!!user) {
      setLoading(true)
      const multiSubmit = new FormData()
      multiSubmit.append('family_name', data.family_name)
      multiSubmit.append('family_name_kana', data.family_name_kana)
      multiSubmit.append('given_name', data.given_name)
      multiSubmit.append('given_name_kana', data.given_name_kana)
      multiSubmit.append('delete_flag', data.delete_flag ? '1' : '0')
      if (!(thumbnailData === null || data.delete_flag)) {
        multiSubmit.append('file', thumbnailData)
      }
      multiSubmit.append('change_password', data.change_password ? '1' : '0')
      if (data.change_password) {
        multiSubmit.append('current_password', data.current_password!)
        multiSubmit.append('password', data.password!)
        multiSubmit.append('password_confirmation', data.password_confirmation!)
      }

      await putRequest<User, FormData>(
        `/user/${user.id}/profile`,
        multiSubmit,
        (err) => {
          console.error(err)
          throw err
        },
        {
          headers: {
            'X-HTTP-Method-Override': 'PUT',
            'Content-Type': 'multipart/form-data',
          },
        }
      )
        .then((updateUser: User) => {
          if (data.delete_flag) {
            setPreview(null)
          }
          setThumbnailData(null)
          setUser(updateUser)
          setThumbnailData(null)
        })
        .catch((err) => {
          if (err.status === 401) {
            router.push('/login')
          }
          if (err.status === 403) {
            router.push('/403', '/forbidden')
          }
          if (err.status === 404) {
            router.push('/404', '/notfound')
          }
          if (err.status === 422) {
            const errBody: { [k: string]: string[] } = err.data.errors
            Object.keys(errBody).forEach((key: string) => {
              const targetKey: any = key
              setError(targetKey, {
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
  }

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files!.length === 0) {
      return false
    }
    if (!event.target.files![0].type.match('image.*')) {
      return false
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target!.result)
    }
    reader.readAsDataURL(event.target.files![0])
    setThumbnailData(event.target.files![0])
  }

  useEffect(() => {
    const fetchUser = async () => {
      await getRequest<User>(requestUri.currentUser, (err) => {
        console.error(err)
        if (err.status === 401) {
          router.push('/login')
        }
      }).then((data: User) => {
        setUser(data)
      })
    }
    fetchUser()
  }, [])

  useEffect(() => {
    if (!!user) {
      setValue('family_name', user.family_name)
      setValue('given_name', user.given_name)
      setValue('family_name_kana', user.family_name_kana)
      setValue('given_name_kana', user.given_name_kana)
      setValue('change_password', false)
      setValue('current_password', undefined)
      setValue('password', undefined)
      setValue('password_confirmation', undefined)
      setValue('file', null)
      setValue('delete_flag', false)
      if (!!user.file_path) {
        setPreview(`${STORAGE_URL}/${user.file_path}`)
      }
    }
  }, [user, setValue, setPreview])

  return (
    <ProfileLayout title={'プロフィール'} user={user}>
      <MypageTitle>
        <div className="container">プロフィール</div>
      </MypageTitle>
      <section>
        <Card className={clsx(['container', classes.top])}>
          <div>
            <div className={clsx([classes.wrap, classes.title])}>
              <Avatar aria-label="recipe" className={classes.avatar}>
                <AccountCircleOutlinedIcon />
              </Avatar>
              <Typography component="h3" variant="h5">
                プロフィール更新
              </Typography>
            </div>
          </div>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <CardContent>
              <Grid container spacing={2} className={classes.wrap}>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name="family_name"
                    rules={{
                      required: {
                        value: true,
                        message: '姓は必須です',
                      },
                      maxLength: {
                        value: 20,
                        message: '20文字を超えています',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="family_name"
                        label="姓"
                        variant="outlined"
                        type="text"
                        placeholder="山田"
                        required
                        fullWidth
                        size={'small'}
                        error={!!errors.family_name}
                      />
                    )}
                  />
                  <p className={classes.err}>
                    {!!errors.family_name && (
                      <FormErrorMessage msg={errors.family_name.message} />
                    )}
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name="given_name"
                    rules={{
                      required: {
                        value: true,
                        message: '名は必須です',
                      },
                      maxLength: {
                        value: 20,
                        message: '20文字を超えています',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="given_name"
                        label="名"
                        variant="outlined"
                        type="text"
                        placeholder="太郎"
                        required
                        fullWidth
                        size={'small'}
                        error={!!errors.given_name}
                      />
                    )}
                  />
                  <p className={classes.err}>
                    {!!errors.given_name && (
                      <FormErrorMessage msg={errors.given_name.message} />
                    )}
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name="family_name_kana"
                    rules={{
                      required: {
                        value: true,
                        message: 'セイは必須です',
                      },
                      pattern: {
                        value: strPatterns.katakana,
                        message: 'カタカナ以外(スペースなど)が入っています',
                      },
                      maxLength: {
                        value: 20,
                        message: '20文字を超えています',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="family_name_kana"
                        label="セイ"
                        variant="outlined"
                        type="text"
                        placeholder="ヤマダ"
                        required
                        size={'small'}
                        fullWidth
                        error={!!errors.family_name_kana}
                      />
                    )}
                  />
                  <p className={classes.err}>
                    {!!errors.family_name_kana && (
                      <FormErrorMessage msg={errors.family_name_kana.message} />
                    )}
                  </p>
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name="given_name_kana"
                    rules={{
                      required: {
                        value: true,
                        message: 'メイは必須です',
                      },
                      pattern: {
                        value: strPatterns.katakana,
                        message: 'カタカナ以外(スペースなど)が入っています',
                      },
                      maxLength: {
                        value: 20,
                        message: '20文字を超えています',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="given_name_kana"
                        label="メイ"
                        variant="outlined"
                        type="text"
                        placeholder="タロウ"
                        required
                        size={'small'}
                        fullWidth
                        error={!!errors.given_name_kana}
                      />
                    )}
                  />
                  <p className={classes.err}>
                    {!!errors.given_name_kana && (
                      <FormErrorMessage msg={errors.given_name_kana.message} />
                    )}
                  </p>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="file"
                    render={({ field }) => (
                      <div {...field}>
                        <input
                          type="file"
                          accept="image/svg+xml,.png,.jpg,.jpeg,.gif"
                          className={classes.none}
                          id="thumbnail"
                          name="file"
                          multiple
                          onChange={handlePreview.bind(null)}
                        />
                        <label htmlFor="thumbnail">
                          <FacePaper preview={preview} />
                        </label>
                        <Controller
                          control={control}
                          name="delete_flag"
                          render={({ field }) => (
                            <FormControlLabel
                              {...field}
                              control={
                                <Checkbox
                                  checked={getValues('delete_flag')}
                                  onChange={handleDeleteFlag}
                                  name="delete_flag"
                                  color="primary"
                                  size={'small'}
                                />
                              }
                              label="顔写真を削除する"
                              className={classes.subFlag}
                            />
                          )}
                        />
                      </div>
                    )}
                  />
                  <p className={classes.err}>
                    {!!errors.file && (
                      <FormErrorMessage msg={errors.file.message} />
                    )}
                  </p>
                </Grid>
                <Grid item xs={12} className={classes.checkRow}>
                  <Controller
                    control={control}
                    name="change_password"
                    render={({ field }) => (
                      <FormControlLabel
                        {...field}
                        control={
                          <Checkbox
                            checked={getValues('change_password')}
                            onChange={handleChangePassword}
                            name="change_password"
                            color="primary"
                          />
                        }
                        label="パスワードを変更する"
                      />
                    )}
                  />
                  <HelpBox />
                </Grid>
                {getValues('change_password') && (
                  <>
                    <Grid item xs={12} spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Controller
                          control={control}
                          name="current_password"
                          rules={{
                            required: {
                              value: getValues('change_password'),
                              message: '現在のパスワードを指定して下さい',
                            },
                            minLength: {
                              value: 8,
                              message:
                                '現在のパスワードは8文字以上64文字以下です',
                            },
                            maxLength: {
                              value: 64,
                              message:
                                '現在のパスワードは8文字以上64文字以下です',
                            },
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="current_password"
                              label="現在のパスワード"
                              variant="outlined"
                              type="password"
                              placeholder="半角英数字"
                              size={'small'}
                              fullWidth
                              error={!!errors.current_password}
                            />
                          )}
                        />
                        <p className={classes.err}>
                          {!!errors.current_password && (
                            <FormErrorMessage
                              msg={errors.current_password.message}
                            />
                          )}
                        </p>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name="password"
                        rules={{
                          required: {
                            value: getValues('change_password'),
                            message: '新しいパスワードを指定して下さい',
                          },
                          pattern: {
                            value: strPatterns.password,
                            message: 'パスワードの形式が違います',
                          },
                          minLength: {
                            value: 8,
                            message: '8文字以上64文字以下で入力してください',
                          },
                          maxLength: {
                            value: 64,
                            message: '8文字以上64文字以下で入力してください',
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="password"
                            label="新しいパスワード"
                            variant="outlined"
                            type="password"
                            placeholder="半角英数字"
                            size={'small'}
                            fullWidth
                            error={!!errors.password}
                          />
                        )}
                      />
                      <p className={classes.err}>
                        {!!errors.password && (
                          <FormErrorMessage msg={errors.password.message} />
                        )}
                      </p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        control={control}
                        name="password_confirmation"
                        rules={{
                          required: {
                            value: getValues('change_password'),
                            message: '新しいパスワードを指定して下さい',
                          },
                          pattern: {
                            value: strPatterns.confirm(comparePassword!),
                            message: '新しいパスワードと一致しません',
                          },
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="password_confirmation"
                            label="新しいパスワード（確認）"
                            variant="outlined"
                            type="password"
                            placeholder="半角英数字"
                            size={'small'}
                            fullWidth
                            error={!!errors.password_confirmation}
                          />
                        )}
                      />
                      <p className={classes.err}>
                        {!!errors.password_confirmation && (
                          <FormErrorMessage
                            msg={errors.password_confirmation.message}
                          />
                        )}
                      </p>
                    </Grid>
                  </>
                )}
              </Grid>
            </CardContent>
            <Divider />
            <CardActions className={classes.footer}>
              <div className={classes.wrap}>
                <CircularButton
                  loading={loading}
                  onClick={handleSubmit(handleUpdate)}
                />
              </div>
            </CardActions>
          </form>
        </Card>
      </section>
    </ProfileLayout>
  )
}

export default Profile
