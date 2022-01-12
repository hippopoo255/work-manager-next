import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { postRequest, requestUri } from '@/api'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
} from '@material-ui/core'
import { Layout } from '@/layouts'
import { FormErrorMessage } from '@/components/atoms'
import { CircularButton } from '@/components/molecules'
import { strPatterns } from '@/lib/util'
import { HelpBox } from '@/components/molecules'
import { CustomAlert } from '@/components/atoms'
import { AlertStatus } from '@/interfaces/common'
import { initialAlertStatus } from '@/lib/initialData'
import { useLocale } from '@/hooks'

type PasswordResetInputs = {
  token: string
  email: string
  password: string
  password_confirmation: string
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  msg: {
    minHeight: 20,
    textAlign: 'left',
  },
  desc: {
    margin: '24px 0',
  },
}))

const PasswordReset = () => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useLocale()
  const [loading, setLoading] = useState<boolean>(false)
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    ...initialAlertStatus,
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
  } = useForm<PasswordResetInputs>({
    defaultValues: {
      token: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })
  const comparePassword = watch('password', '')

  const onSubmit: SubmitHandler<PasswordResetInputs> = async (data) => {
    await resetPassword(data)
  }

  const resetPassword = async (data: PasswordResetInputs) => {
    setLoading(true)
    const submitData = {
      ...data,
      email: atob(data.email),
    }
    await postRequest<{ message: string }, PasswordResetInputs>(
      requestUri.resetPassword,
      submitData,
      (err) => {
        console.error(err)
        throw err
      }
    )
      .then((res) => {
        setAlertStatus((prev) => ({
          ...prev,
          msg: res.message,
          severity: 'success',
          show: true,
        }))
        setTimeout(() => {
          router.push('/login')
        }, 4000)
      })
      .catch((err) => {
        if (err.status === 422) {
          const errBody: { [k: string]: string[] } = err.data.errors
          Object.keys(errBody).forEach((key) => {
            setError('password', {
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

  const paramToken = router.query.token

  const handleAlertClose = () => {
    setAlertStatus((prev) => ({
      ...prev,
      show: false,
    }))
  }

  useEffect(() => {
    if (router.query !== undefined) {
      setValue('email', String(router.query.email))
      setValue('token', String(paramToken))
    }
  }, [paramToken])

  return (
    <Layout title={'パスワード再設定'}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        ></meta>
        <meta
          name="description"
          content="新しいパスワードを設定するフォームです"
        />
      </Head>
      <Container
        component="section"
        maxWidth="xs"
        className={classes.container}
      >
        <CssBaseline />
        <div style={{ width: '100%' }}>
          <Typography
            component={'h2'}
            variant={'h2'}
            align="center"
            gutterBottom
          >
            パスワードの再設定
          </Typography>
          <Grid container alignItems={'center'} justifyContent={'center'}>
            <Typography
              variant="body2"
              gutterBottom
              align="center"
              className={classes.desc}
            >
              再設定用のパスワードを入力して下さい。
            </Typography>
            <HelpBox />
          </Grid>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} justifyContent={'center'}>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name={'password'}
                  rules={{
                    required: {
                      value: true,
                      message: '必須項目です',
                    },
                    minLength: {
                      value: 8,
                      message: '8文字以上64文字以下で入力してください',
                    },
                    maxLength: {
                      value: 64,
                      message: '8文字以上64文字以下で入力してください',
                    },
                    pattern: {
                      value: strPatterns.password,
                      message: 'パスワードの形式が正しくありません',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      name="password"
                      variant="outlined"
                      label={'新しいパスワード'}
                      required
                      fullWidth
                      size={'small'}
                      error={!!errors.password}
                    />
                  )}
                />
                <p className={classes.msg}>
                  {!!errors.password && (
                    <FormErrorMessage msg={errors.password.message} />
                  )}
                </p>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  control={control}
                  name={'password_confirmation'}
                  rules={{
                    required: {
                      value: true,
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
                      type="password"
                      name="password_confirmation"
                      variant="outlined"
                      label={'新しいパスワード（確認）'}
                      required
                      fullWidth
                      size={'small'}
                      error={!!errors.password_confirmation}
                    />
                  )}
                />
                <p className={classes.msg}>
                  {!!errors.password_confirmation && (
                    <FormErrorMessage
                      msg={errors.password_confirmation.message}
                    />
                  )}
                </p>
              </Grid>
              <Grid item style={{ textAlign: 'center' }}>
                <CircularButton
                  loading={loading}
                  submitText={t.common.send}
                  onClick={handleSubmit(onSubmit)}
                  disabled={!!alertStatus.msg}
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <CustomAlert alertStatus={alertStatus} onClose={handleAlertClose} />
    </Layout>
  )
}

export default PasswordReset
