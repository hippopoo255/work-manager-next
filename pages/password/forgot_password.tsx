import React, { useState } from 'react'
import Head from 'next/head'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
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
import { ForgotPasswordInputs } from '@/interfaces/form/inputs'
import { useLocale, usePasswordReset } from '@/hooks'

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
    color: theme.palette.primary.main,
    whiteSpace: 'pre-wrap',
  },
  desc: {
    margin: '24px 0',
  },
}))

const ForgotPassword = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>('')
  const { t } = useLocale()
  const { forgotPassword } = usePasswordReset()
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
  } = useForm<ForgotPasswordInputs>({
    defaultValues: { login_id: '' },
  })

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    await sendReminder(data)
  }

  const sendReminder = async (data: ForgotPasswordInputs) => {
    setLoading(true)
    await forgotPassword(data)
      .then(({ message }) => {
        setMsg(message)
      })
      .catch(({ key, message }) => {
        setError(key, {
          type: 'invalid',
          message,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Layout title={'パスワードをお忘れの方'}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        ></meta>
        <meta
          name="description"
          content="パスワードをお忘れの方用専用フォーム"
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
          <Typography
            variant="body2"
            gutterBottom
            align="center"
            className={classes.desc}
          >
            再設定用のURLを送信します。
            <br />
            ご登録のメールアドレスまたはユーザ名を入力して下さい。
          </Typography>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={10}>
                <Controller
                  control={control}
                  name={'login_id'}
                  rules={{
                    required: {
                      value: true,
                      message: '必須項目です',
                    },
                    // pattern: {
                    //   value: strPatterns.email,
                    //   message: 'メールアドレスの形式が正しくありません',
                    // },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      name="login_id"
                      variant="outlined"
                      label={'ご登録のユーザID'}
                      required
                      fullWidth
                      size={'small'}
                      error={!!errors.login_id}
                    />
                  )}
                />
                {!!msg ? (
                  <p className={classes.msg}>{msg}</p>
                ) : (
                  <p className={classes.msg}>
                    {!!errors.login_id && (
                      <FormErrorMessage msg={errors.login_id.message} />
                    )}
                  </p>
                )}
              </Grid>
              <Grid item xs={12} md={2} style={{ textAlign: 'center' }}>
                <CircularButton
                  loading={loading}
                  submitText={t.common.send}
                  onClick={handleSubmit(onSubmit)}
                  disabled={!!msg}
                />
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </Layout>
  )
}

export default ForgotPassword
