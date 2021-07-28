import React from 'react'
import axios from '@/axios'
import requests from '@/Requests'
import { useState, useCallback } from 'react'
import { Layout } from '@/layouts'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
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

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // background: `radial-gradient(circle at 10px 20px, ${theme.palette.primary.main} 0 25%, ${theme.palette.primary.dark} 95%)`,
    // color: '#fefefe',
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
    await axios.post(requests.login, loginData).then((res: any) => {
      if (res.status === 200) {
        router.push('/mypage')
      }
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
            Sign in
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
      </Container>
    </Layout>
  )
}
export default Login
