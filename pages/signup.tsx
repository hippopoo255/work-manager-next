import React, { useState, useMemo, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '@/layouts'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Box,
  darken,
  Avatar,
  Container,
  CssBaseline,
  Grid,
  Typography,
  IconButton,
} from '@material-ui/core'
import { InputAdornment, TextField } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { CustomAlert, FormErrorMessage } from '@/components/atoms'
import {
  CircularButton,
  HelpBox,
  TestLoginButton,
} from '@/components/molecules'
import { AlertStatus } from '@/interfaces/common'
import { SignupInputs } from '@/interfaces/form/inputs'
import { initialAlertStatus } from '@/lib/initialData'
import { strPatterns } from '@/lib/util'
import { linerGradient } from '@/assets/color/gradient'
import { useLocale, useAuth } from '@/hooks'
import { AxiosError } from 'axios'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(4, 'auto'),
  },
  avatar: {
    margin: theme.spacing(1),
    background: 'linear-gradient(135deg,#fad961,#f76b1c)',
    boxShadow: theme.shadows[2],
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0),
    background: linerGradient.red,
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
    '&:hover': {
      opacity: theme.palette.action.focusOpacity * 5,
    },
    '&.Mui-disabled': {
      background: theme.palette.action.focus,
      color: theme.palette.action.disabled,
    },
  },
  label: {
    fontSize: '90%',
  },
  body: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2, 3),
  },
}))

const Signup = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    ...initialAlertStatus,
  })
  const { t } = useLocale()
  const options = {
    fullWidth: true,
    className: classes.submit,
  }

  const onAlertClose = () => {
    setAlertStatus((prev) => ({
      ...prev,
      show: false,
    }))
  }

  const calc = alertStatus.show

  useEffect(() => {
    setTimeout(() => {
      setAlertStatus((prev) => ({
        ...prev,
        show: false,
      }))
    }, 5000)
  }, [calc])

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<SignupInputs>()
  const { signup, duplicateEmailCount } = useAuth()

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    setLoading(true)
    const isDuplicateEmail = await checkDuplicateEmail(data.email)
    if (isDuplicateEmail) {
      setLoading(false)
      return false
    }
    await signup(data).catch(({ key, message }) => {
      setLoading(false)
      setError(key, {
        type: 'invalid',
        message,
      })
    })
  }

  // メールアドレスの重複チェック
  // const handleEnteredValue = async (
  //   e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const invalidType = errors.email === undefined ? '' : errors.email.type
  //   const canSend = !(['required', 'pattern'].includes(invalidType) || !getValues('email'))
  //   if (canSend) {
  //     await checkDuplicateEmail(e.target.value)
  //   }
  // }

  const checkDuplicateEmail = async (email: SignupInputs['email']) => {
    return await duplicateEmailCount(email)
      .then((count: number) => {
        if (count > 0) {
          setError('email', {
            type: 'validate',
            message: 'このメールアドレスは既に登録されています',
          })
        } else {
          clearErrors('email')
        }
        // \!!count...isDuplicate
        return !!count
      })
      .catch((err: AxiosError['response']) => {
        setAlertStatus((prev) => ({
          ...prev,
          severity: 'error',
          msg: 'ネットワークまたはサーバエラーです',
          show: true,
        }))
        const hasError = 1
        return !!hasError
      })
  }

  // パスワードの表示 / 非表示
  const [type, setType] = useState<'text' | 'password'>('password')
  const handleType = () => {
    setType((prev) => (prev === 'text' ? 'password' : 'text'))
  }
  const iconByType = useMemo(() => {
    const icon = type === 'text' ? <VisibilityIcon /> : <VisibilityOffIcon />
    return {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleType}
            edge="end"
          >
            {icon}
          </IconButton>
        </InputAdornment>
      ),
    }
  }, [type])

  return (
    <Layout title={t.head.title.signup}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        ></meta>
      </Head>
      <Container component="section" maxWidth="xs" className={classes.body}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            {t.head.title.signup}
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      required
                      margin="normal"
                      label="メールアドレス"
                      autoFocus
                      id="email"
                      error={!!errors.email}
                      style={{ margin: 0 }}
                      type="email"
                    />
                  )}
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: {
                      value: true,
                      message: 'メールアドレスは必須です',
                    },
                    pattern: {
                      value: strPatterns.email,
                      message: 'メールアドレスの形式が違います',
                    },
                  }}
                />
                <Box style={{ minHeight: 20 }}>
                  {!!errors.email && (
                    <FormErrorMessage msg={errors.email.message} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      required
                      margin="normal"
                      label="ログインID"
                      placeholder="半角英数字（8〜64文字）"
                      id="login_id"
                      error={!!errors.login_id}
                      style={{ margin: 0 }}
                    />
                  )}
                  name="login_id"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: {
                      value: true,
                      message: 'ログインIDは必須です',
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
                />
                <Box style={{ minHeight: 20 }}>
                  {!!errors.login_id && (
                    <FormErrorMessage msg={errors.login_id.message} />
                  )}
                </Box>
              </Grid>
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
                      error={!!errors.family_name}
                    />
                  )}
                />
                <Box style={{ minHeight: 20 }}>
                  {!!errors.family_name && (
                    <FormErrorMessage msg={errors.family_name.message} />
                  )}
                </Box>
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
                      error={!!errors.given_name}
                    />
                  )}
                />
                <Box style={{ minHeight: 20 }}>
                  {!!errors.given_name && (
                    <FormErrorMessage msg={errors.given_name.message} />
                  )}
                </Box>
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
                      fullWidth
                      error={!!errors.family_name_kana}
                    />
                  )}
                />
                <Box style={{ minHeight: 20 }}>
                  {!!errors.family_name_kana && (
                    <FormErrorMessage msg={errors.family_name_kana.message} />
                  )}
                </Box>
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
                      fullWidth
                      error={!!errors.given_name_kana}
                    />
                  )}
                />
                <Box style={{ minHeight: 20 }}>
                  {!!errors.given_name_kana && (
                    <FormErrorMessage msg={errors.given_name_kana.message} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box textAlign={'right'}>
                  <HelpBox />
                </Box>
                <Controller
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      required
                      error={!!errors.password}
                      label="パスワード"
                      type={type}
                      id="password"
                      style={{ margin: 0 }}
                      InputProps={iconByType}
                    />
                  )}
                  name="password"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'パスワードは必須です',
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
                />
                <Box style={{ minHeight: 20 }}>
                  {!!errors.password && (
                    <FormErrorMessage msg={errors.password.message} />
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <CircularButton
                    loading={loading}
                    submitText={t.common.signup}
                    onClick={handleSubmit(onSubmit)}
                    options={options}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs>
                    <Link href="/login" as="/login" passHref>
                      <Typography
                        variant={'button'}
                        component={'a'}
                        color={'primary'}
                      >
                        {t.common.moveToLogin}
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TestLoginButton />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="パスワードを記憶する"
              classes={{
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
            /> */}
          </form>
        </div>
        <CustomAlert alertStatus={alertStatus} onClose={onAlertClose} />
      </Container>
    </Layout>
  )
}
export default Signup
