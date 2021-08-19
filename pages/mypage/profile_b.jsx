import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { MypageLayout } from '@/layouts'
import { MypageTitle } from '@/components/atoms'
import { CircularButton } from '@/components/molecules'
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
import { useForm, Controller, IsAny } from 'react-hook-form'
import { ProfileInputs } from '@/interfaces/form/inputs'
import { ProfileSubmit } from '@/interfaces/form/submit'
import { FormErrorMessage } from '@/components/atoms'
import { HelpBox } from '@/components/molecules'
import { strPatterns } from '@/lib/util'
import { putRequest } from '@/api'
import axios from '@/axios'

const usePaperStyles = makeStyles((theme) =>
  createStyles({
    facePaper: {
      cursor: 'pointer',
    },
    output: {
      zIndex: 1,
      display: 'block',
      width: '100%',
    },
    fill: {
      position: 'relative',
      top: 0,
      left: 0,
      width: '100%',
      height: 0,
      paddingBottom: '56.25%',
      background: theme.palette.grey[300],
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

const FacePaper = ({ preview }) => {
  const classes = usePaperStyles()
  return (
    <Tooltip title={'顔写真アップロード'}>
      <Paper square className={classes.facePaper}>
        <output className={classes.output}>
          {preview !== null && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt={'サムネイル画像'} />
          )}
        </output>
        {preview === null && (
          <div className={classes.fill}>
            <div className={classes.mark}>
              <IconButton
                color="inherit"
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

const useStyles = makeStyles((theme) =>
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
  })
)

const Profile = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [changePassword, setChangePassword] = useState(false)
  const [preview, setPreview] = useState(null)
  const [coreFile, setCoreFile] = useState(null)
  const [defaultValues, setDefaultValues] = useState({
    family_name_kana: 'フガ',
    family_name: 'ふが',
    given_name_kana: 'ノッシ',
    given_name: 'のっし',
    file: null,
    delete_flag: false,
  })
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  })
  const comparePassword = watch('password', '')

  const handleChangePassword = () => {
    setChangePassword(!changePassword)
    clearErrors('current_password')
    clearErrors('password')
    clearErrors('password_confirmation')
    setValue('password', '')
    setValue('password', '')
    setValue('password_confirmation', '')
  }

  const handleUpdate = async (data) => {
    const multiSubmit = new FormData()
    multiSubmit.append('family_name', data.family_name)
    multiSubmit.append('family_name_kana', data.family_name_kana)
    multiSubmit.append('given_name', data.given_name)
    multiSubmit.append('given_name_kana', data.given_name_kana)
    multiSubmit.append('file', coreFile)
    multiSubmit.append('delete_flag', data.delete_flag ? '1' : '0')
    if (data.change_password) {
      multiSubmit.append('change_password', changePassword ? '1' : '0')
      multiSubmit.append('current_password', data.current_password)
      multiSubmit.append('password', data.password)
      multiSubmit.append('password_confirmation', data.password_confirmation)
    }
    const submitData = {
      family_name: data.family_name,
      given_name: data.given_name,
      family_name_kana: data.family_name_kana,
      given_name_kana: data.given_name_kana,
      file: data.file,
      delete_flag: data.delete_flag,
      change_password: changePassword,
      current_password: data.current_password,
      password: data.password,
      password_confirmation: data.password_confirmation,
    }
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
      },
    }
    await axios.post('/user/1/profile', multiSubmit, config)
    // await putRequest('/user/1/profile', multiSubmit, (err) => {
    //   console.error(err)
    // }).then((data) => {
    //   console.log(data)
    // })
  }

  const handlePreview = (event) => {
    if (event.target.files.length === 0) {
      return false
    }
    if (!event.target.files[0].type.match('image.*')) {
      return false
    }
    console.log(event.target.files[0])
    // setValue('file', event.target.files[0])
    setCoreFile(event.target.files[0])
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target.result)
    }
    reader.readAsDataURL(event.target.files[0])
  }

  return (
    <MypageLayout title={'プロフィール'}>
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
                          accept="image/*"
                          className={classes.none}
                          id="thumbnail"
                          name="file"
                          multiple
                          onChange={handlePreview.bind(null)}
                        />
                        <label htmlFor="thumbnail">
                          <FacePaper preview={preview} />
                        </label>
                      </div>
                    )}
                  />
                </Grid>
                <Grid item xs={12} className={classes.checkRow}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={changePassword}
                        onChange={handleChangePassword}
                        name="changePassword"
                        color="primary"
                      />
                    }
                    label="パスワードを変更する"
                  />
                  <HelpBox />
                </Grid>
                {changePassword && (
                  <>
                    <Grid item xs={12} spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Controller
                          control={control}
                          name="current_password"
                          rules={{
                            required: {
                              value: changePassword,
                              message: '必須項目です',
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
                            value: changePassword,
                            message: '必須項目です',
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
                            value: changePassword,
                            message: '必須項目です',
                          },
                          pattern: {
                            value: strPatterns.confirm(comparePassword),
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
    </MypageLayout>
  )
}

export default Profile
