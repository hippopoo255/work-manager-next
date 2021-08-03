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
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { User } from '@/interfaces/models'
import { AxiosError } from 'axios'
import { CustomAlert } from '@/components/atoms'
import { AlertStatus } from '@/interfaces'
import { darken } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    background: 'linear-gradient(135deg,#fad961,#f76b1c)',
    boxShadow:
      // '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
      theme.shadows[2],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await login(data)
  }

  const login = async (data: Inputs) => {
    const loginData: any = new FormData()
    loginData.append('login_id', data.login_id)
    loginData.append('password', data.password)
    await postRequest<User>(requests.login, loginData, (err) => {
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
      .catch((err: AxiosError) => {
        return false
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
      <Container component="main" maxWidth="xs">
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
                  margin="normal"
                  required
                  label="ログインID"
                  autoFocus
                  id="login_id"
                />
              )}
              name="login_id"
              control={control}
              defaultValue=""
              rules={{ required: true }}
            />
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                  label="パスワード"
                  type="password"
                  id="password"
                />
              )}
              name="password"
              control={control}
              rules={{ required: true }}
            />
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
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {'アカウントの作成はこちら'}
                </Link>
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
