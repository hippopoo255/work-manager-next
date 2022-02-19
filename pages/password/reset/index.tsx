import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
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
import { CircularButton, PasswordTextField } from '@/components/molecules'
import { strPatterns } from '@/lib/util'
import { HelpBox } from '@/components/molecules'
import { CustomAlert } from '@/components/atoms'
import { AlertStatus } from '@/interfaces/common'
import {
  ForgotPasswordResetInputs,
  PasswordResetInputs,
} from '@/interfaces/form/inputs'
import { initialAlertStatus } from '@/lib/initialData'
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
  },
  desc: {
    margin: '24px 0',
  },
}))

const PasswordReset = () => {
  const classes = useStyles()
  const router = useRouter()
  const { t } = useLocale()
  const { resetForgottenPassword } = usePasswordReset()
  const queryN = router.query.n
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
  } = useForm<ForgotPasswordResetInputs>()

  const onSubmit: SubmitHandler<ForgotPasswordResetInputs> = async (data) => {
    await resetPassword(data)
  }

  const resetPassword = async (data: ForgotPasswordResetInputs) => {
    setLoading(true)
    await resetForgottenPassword(data)
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

  const handleAlertClose = () => {
    setAlertStatus((prev) => ({
      ...prev,
      show: false,
    }))
  }

  useEffect(() => {
    if (queryN !== undefined) {
      setValue('login_id', String(queryN))
    }
  }, [queryN])

  return (
    <Layout title={t.head.title.reset_password}>
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
                  name={'verification_code'}
                  rules={{
                    required: {
                      value: true,
                      message: '必須項目です',
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      name="code"
                      type="number"
                      variant="outlined"
                      required
                      label={'検証用コード'}
                      autoFocus
                      fullWidth
                      size={'small'}
                      error={!!errors.verification_code}
                    />
                  )}
                />
                <p className={classes.msg}>
                  {!!errors.verification_code && (
                    <FormErrorMessage msg={errors.verification_code.message} />
                  )}
                </p>
              </Grid>
              <Grid item xs={12}>
                <PasswordTextField
                  control={control}
                  error={!!errors.password}
                  textProps={{
                    size: 'small',
                    variant: 'outlined',
                    label: '新しいパスワード',
                  }}
                />
                <p className={classes.msg}>
                  {!!errors.password && (
                    <FormErrorMessage msg={errors.password.message} />
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
