import React, { useState, useEffect } from 'react'
import { postRequest } from '@/api'
import requests from '@/Requests'
import { Layout } from '@/layouts'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
// import Link from '@material-ui/core/Link'
import Link from 'next/link'

import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { User } from '@/interfaces/models'
import { CustomAlert, FormErrorMessage } from '@/components/atoms'
import { AlertStatus } from '@/interfaces/common'
import { darken } from '@material-ui/core'

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
    background: `linear-gradient(165deg, ${darken('#5dff26', 0.1)}, #5cb363)`,
    color: '#ffffff',
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
  },
}))

export type Inputs = {
  login_id: string
  password: string
}

const Login = () => {
  const router = useRouter()
  const classes = useStyles()
  // TODO: 状態管理すべき
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    severity: 'error',
    variant: 'filled',
    msg: '',
    show: false,
  })

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
    register,
    handleSubmit,
    watch,
    control,
    setError,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await login(data)
  }

  const login = async (data: Inputs) => {
    const loginData: FormData = new FormData()
    loginData.append('login_id', data.login_id)
    loginData.append('password', data.password)
    await postRequest<User, FormData>(requests.login, loginData, (err) => {
      if (err.status === 422) {
        setAlertStatus((prev) => ({
          ...prev,
          msg: 'データ形式が正しくありません',
          severity: 'error',
          open: true,
        }))
        console.error(err)
      }
      throw err
    })
      .then((res: User) => {
        router.push('/mypage')
      })
      .catch((err) => {
        const errBody: { [k: string]: string[] } = err.data.errors
        setError('login_id', {
          type: 'invalid',
          message: errBody.login_id[0],
        })
        setError('password', {
          type: 'invalid',
          message: errBody.login_id[0],
        })
      })
  }

  return (
    <Layout title="ログイン">
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
          <Typography component="h1" variant="h5">
            Log in
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
            <p style={{ minHeight: 20 }}>
              {!!errors.login_id && (
                <FormErrorMessage msg={errors.login_id.message} />
              )}
            </p>

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
            <p style={{ minHeight: 20 }}>
              {!!errors.password && (
                <FormErrorMessage msg={errors.password.message} />
              )}
            </p>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="パスワードを記憶する"
              classes={{
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ログイン
            </Button>
            <Grid container>
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
                    パスワードをお忘れの方
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                {/* <Link href="#" variant="body2">
                  {'アカウントの作成はこちら'}
                </Link> */}
              </Grid>
            </Grid>
          </form>
        </div>
        <CustomAlert {...alertStatus} />
      </Container>
    </Layout>
  )
}
export default Login
