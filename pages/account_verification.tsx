import React, { useState, useEffect } from 'react'
import { Layout } from '@/layouts'
import { CircularButton } from '@/components/molecules'
import { FormErrorMessage } from '@/components/atoms'
import {
  Box,
  darken,
  Avatar,
  Container,
  CssBaseline,
  Typography,
  TextField,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { useLocale } from '@/hooks'
import { useAuth } from '@/hooks'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { AccountVerificationInputs } from '@/interfaces/form/inputs'
import { decode64 } from '@/lib/util'

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
  description: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
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

const AccountVerification = () => {
  const classes = useStyles()
  const { t } = useLocale()
  const [loading, setLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    setError,
    setValue,
    formState: { errors },
  } = useForm<AccountVerificationInputs>()
  const { verifyUser, router } = useAuth()

  const onSubmit: SubmitHandler<AccountVerificationInputs> = async (data) => {
    setLoading(true)
    await verifyUser(data).catch(({ key, message }) => {
      setLoading(false)
      setError(key, {
        type: 'invalid',
        message,
      })
    })
  }
  const paramId = router.query.n
  useEffect(() => {
    if (!!paramId) {
      setValue('login_id', decode64(String(router.query.n)))
    }
  }, [paramId])

  return (
    <Layout title={t.head.title.accountVerification}>
      <Container component="section" maxWidth="xs" className={classes.body}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            {t.head.title.accountVerification}
          </Typography>
          <Box my={3}>
            <Typography
              className={classes.description}
              component="p"
              variant="subtitle1"
            >
              {
                'ご入力いただいたメールアドレスに検証コードを送信しましたので、当該検証コードを入力してください。'
              }
            </Typography>
          </Box>
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
                  type="number"
                  margin="normal"
                  label="検証コード"
                  autoFocus
                  id="verification_code"
                  error={!!errors.verification_code}
                  style={{ marginBottom: 0 }}
                />
              )}
              name="verification_code"
              control={control}
              defaultValue=""
              rules={{
                required: {
                  value: true,
                  message: '検証コードは必須です',
                },
              }}
            />
            <Box style={{ minHeight: 20 }}>
              {!!errors.verification_code && (
                <FormErrorMessage msg={errors.verification_code.message} />
              )}
            </Box>
            <Box my={2}>
              <CircularButton
                loading={loading}
                submitText={t.common.accountVerification}
                onClick={handleSubmit(onSubmit)}
                options={{ fullWidth: true }}
              />
            </Box>
          </form>
        </div>
      </Container>
    </Layout>
  )
}

export default AccountVerification
