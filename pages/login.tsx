import React, { useState, useEffect } from 'react'
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
} from '@material-ui/core'
import { TextField } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { CustomAlert, FormErrorMessage } from '@/components/atoms'
import { CircularButton, TestLoginButton } from '@/components/molecules'
import { AlertStatus } from '@/interfaces/common'
import { LoginInputs } from '@/interfaces/form/inputs'
import { initialAlertStatus } from '@/lib/initialData'
import { useLocale, useAuth } from '@/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    background: 'linear-gradient(135deg,#fad961,#f76b1c)',
    boxShadow: theme.shadows[2],
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0),
    background: `linear-gradient(165deg, ${darken('#5dff26', 0.1)}, #5cb363)`,
    color: theme.palette.common.white,
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

const Login = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    ...initialAlertStatus,
  })
  const { t } = useLocale()
  const { login } = useAuth()

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>()

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true)
    await login(data).catch(({ key, message }) => {
      setLoading(false)
      setError(key, {
        type: 'invalid',
        message,
      })
    })
  }

  return (
    <Layout title={t.head.title.login}>
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
            {t.head.title.login}
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  required
                  margin="normal"
                  label="ログインID"
                  autoFocus
                  id="login_id"
                  error={!!errors.login_id}
                  style={{ marginBottom: 0 }}
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
              }}
            />
            <Box style={{ minHeight: 20 }}>
              {!!errors.login_id && (
                <FormErrorMessage msg={errors.login_id.message} />
              )}
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
                  type="password"
                  id="password"
                  style={{ marginBottom: 0 }}
                />
              )}
              name="password"
              defaultValue=""
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'パスワードは必須です',
                },
              }}
            />
            <Box style={{ minHeight: 20 }}>
              {!!errors.password && (
                <FormErrorMessage msg={errors.password.message} />
              )}
            </Box>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="パスワードを記憶する"
              classes={{
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
            /> */}
            <Box my={2}>
              <CircularButton
                loading={loading}
                submitText={t.common.login}
                onClick={handleSubmit(onSubmit)}
                options={{ fullWidth: true }}
              />
            </Box>
            <Grid container spacing={3}>
              <Grid item xs>
                <Link
                  href="/password/forgot_password"
                  as="/forgot_password"
                  passHref
                >
                  <Typography
                    variant={'button'}
                    component={'a'}
                    color={'primary'}
                  >
                    {t.common.passwordForget}
                  </Typography>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TestLoginButton />
              </Grid>
            </Grid>
          </form>
        </div>
        <CustomAlert
          alertStatus={alertStatus}
          setAlertStatus={setAlertStatus}
        />
      </Container>
    </Layout>
  )
}
export default Login
