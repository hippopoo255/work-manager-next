import Head from 'next/head'
import Link from 'next/link'
import { Layout } from '@/layouts'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Box,
  Avatar,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Controller } from 'react-hook-form'
import { CustomAlert, FormErrorMessage } from '@/components/atoms'
import { CircularButton, PasswordTextField } from '@/components/molecules'
import { linerGradient } from '@/assets/color/gradient'
import { useLocale, useAccountSetup } from '@/hooks'

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

const AccountSetup = () => {
  const classes = useStyles()
  const { t } = useLocale()

  const options = {
    fullWidth: true,
    className: classes.submit,
  }

  const {
    alertStatus,
    setAlertStatus,
    control,
    errors,
    handleSubmit,
    loading,
    onSubmit,
  } = useAccountSetup({ duplicateValidationKey: 'login_id' })

  return (
    <Layout title={t.head.title.accountSetup}>
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
            {t.head.title.accountSetup}
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
              <Grid item xs={12}>
                <PasswordTextField
                  control={control}
                  error={!!errors.password}
                  helpBox
                  textProps={{
                    variant: 'outlined',
                    margin: 'normal',
                    id: 'password',
                    label: 'パスワード',
                    style: { margin: 0 },
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
                <Box display={'flex'} justifyContent={'center'}>
                  <Link href="/login" as="/login" passHref>
                    <Typography
                      variant={'button'}
                      component={'a'}
                      color={'primary'}
                    >
                      {t.common.moveToLogin}
                    </Typography>
                  </Link>
                </Box>
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
export default AccountSetup
