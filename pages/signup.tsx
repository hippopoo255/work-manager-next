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
import { SignupInputs } from '@/interfaces/form/inputs'
import { initialAlertStatus } from '@/lib/initialData'
import { linerGradient } from '@/assets/color/gradient'
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
    margin: theme.spacing(3, 0, 2),
    background: linerGradient.red,
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
    '&:hover': {
      opacity: theme.palette.action.focusOpacity * 5,
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
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
    formState: { errors },
  } = useForm<SignupInputs>()
  const { signup } = useAuth()

  const onSubmit: SubmitHandler<SignupInputs> = async (data) => {
    // setLoading(true)
    await signup(data).catch(({ key, message }) => {
      setLoading(false)
      setError(key, {
        type: 'invalid',
        message,
      })
    })
  }

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
                  style={{ marginBottom: 0 }}
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
              }}
            />
            <Box style={{ minHeight: 20 }}>
              {!!errors.email && (
                <FormErrorMessage msg={errors.email.message} />
              )}
            </Box>

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
                  required
                  margin="normal"
                  label="住所"
                  autoFocus
                  id="address"
                  error={!!errors.address}
                  style={{ marginBottom: 0 }}
                />
              )}
              name="address"
              control={control}
              defaultValue=""
            />
            <Box style={{ minHeight: 20 }}>
              {!!errors.address && (
                <FormErrorMessage msg={errors.address.message} />
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
                submitText={t.common.signup}
                onClick={handleSubmit(onSubmit)}
                options={options}
              />
            </Box>
            <Grid container spacing={3}>
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
          </form>
        </div>
        <CustomAlert alertStatus={alertStatus} onClose={onAlertClose} />
      </Container>
    </Layout>
  )
}
export default Signup
