import React, { useState, useMemo, useEffect } from 'react'
import Head from 'next/head'
import { MypageLayout } from '@/layouts'
import { makeStyles, Theme } from '@material-ui/core/styles'
import {
  Box,
  Button,
  Avatar,
  Container,
  CssBaseline,
  Grid,
  Typography,
  MenuItem,
  IconButton,
} from '@material-ui/core'
import { InputAdornment, TextField } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined'
import { Controller, SubmitHandler } from 'react-hook-form'
import { CustomAlert, FormErrorMessage } from '@/components/atoms'
import { CircularButton, CustomLoader, HelpBox } from '@/components/molecules'
import { AlertStatus } from '@/interfaces/common'
import { OrganizationInputs } from '@/interfaces/form/inputs'
import { initialAlertStatus } from '@/lib/initialData'
import { strPatterns } from '@/lib/util'
import { useLocale, useOrganization } from '@/hooks'
import { useRouter } from 'next/router'

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
  address: {
    paddingTop: 6,
    paddingBottom: 6,
  },
  submit: {
    margin: theme.spacing(2, 0),
    // background: linerGradient.red,
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

const OrganizationCreate = () => {
  const classes = useStyles()
  const router = useRouter()
  const {
    auth,
    control,
    errors,
    handleSubmit,
    handlePostalCode,
    loading,
    prefectureList,
    save,
    setError,
  } = useOrganization()
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    ...initialAlertStatus,
  })
  const [initialLoader, setInitialLoader] = useState<boolean>(true)
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

  const onSubmit: SubmitHandler<OrganizationInputs> = async (
    data: OrganizationInputs
  ) => {
    await save(data).catch((messages: { key: any; message: string }[]) => {
      messages.forEach(({ key, message }) => {
        setError(key, {
          type: 'invalid',
          message,
        })
      })
    })
  }

  // パスワードの表示 / 非表示
  const [type, setType] = useState<'text' | 'password'>('password')
  const handleType = () => {
    setType((prev) => (prev === 'text' ? 'password' : 'text'))
  }
  const iconByType = useMemo(() => {
    const icon = type === 'text' ? <VisibilityIcon /> : <VisibilityOffIcon />
    return {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleType}
            edge="end"
          >
            {icon}
          </IconButton>
        </InputAdornment>
      ),
    }
  }, [type])

  useEffect(() => {
    if (auth.user.is_initialized) {
      router.push('/mypage')
    } else if (auth.isLogin) {
      setInitialLoader(false)
    }
  }, [auth])

  return (
    <MypageLayout title={t.head.title.organizationStore}>
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
            <BusinessOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            {t.head.title.organizationStore}
          </Typography>
          {initialLoader ? (
            <CustomLoader />
          ) : (
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
                        label="組織名"
                        id="name"
                        error={!!errors.name}
                        required
                        size={'small'}
                        autoFocus
                        placeholder="ジョブサポ株式会社"
                      />
                    )}
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: {
                        value: true,
                        message: '組織名は必須です',
                      },
                    }}
                  />
                  <Box style={{ minHeight: 20 }}>
                    {!!errors.name && (
                      <FormErrorMessage msg={errors.name.message} />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="outlined"
                        required
                        label="組織名カナ"
                        id="name_kana"
                        error={!!errors.name_kana}
                        size={'small'}
                        placeholder="ジョブサポカブシキガイシャ"
                      />
                    )}
                    name="name_kana"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: {
                        value: true,
                        message: '組織名は必須です',
                      },
                      pattern: {
                        value: strPatterns.katakana,
                        message: 'カタカナ以外(スペースなど)が入っています',
                      },
                    }}
                  />
                  <Box style={{ minHeight: 20 }}>
                    {!!errors.name_kana && (
                      <FormErrorMessage msg={errors.name_kana.message} />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    defaultValue=""
                    name="postal_code"
                    rules={{
                      required: {
                        value: true,
                        message: '郵便番号は必須です',
                      },
                      pattern: {
                        value: strPatterns.postal,
                        message: '郵便番号の形式が違います',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="postal_code"
                        label="郵便番号"
                        variant="outlined"
                        placeholder="ハイフン不要"
                        type="number"
                        error={!!errors.postal_code}
                        size={'small'}
                        required
                      />
                    )}
                  />
                  <Box style={{ minHeight: 20 }}>
                    {!!errors.postal_code && (
                      <FormErrorMessage msg={errors.postal_code.message} />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant={'outlined'}
                    color={'secondary'}
                    onClick={handlePostalCode}
                    classes={{ outlined: classes.address }}
                  >
                    住所入力
                  </Button>
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name="pref_id"
                    rules={{
                      required: {
                        value: true,
                        message: '都道府県は必須です',
                      },
                      min: {
                        value: 1,
                        message: '都道府県は必須です',
                      },
                    }}
                    defaultValue={0}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="都道府県"
                        variant="outlined"
                        size="small"
                        error={!!errors.pref_id}
                        fullWidth
                        select
                      >
                        <MenuItem value={0}>
                          {'都道府県を選択してください'}
                        </MenuItem>
                        {prefectureList.map((prefecture) => (
                          <MenuItem key={prefecture.id} value={prefecture.id}>
                            {prefecture.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />

                  <Box style={{ minHeight: 20 }}>
                    {!!errors.pref_id && (
                      <FormErrorMessage msg={errors.pref_id.message} />
                    )}
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        // fullWidth
                        variant="outlined"
                        required
                        label="市区町村"
                        id="city"
                        error={!!errors.city}
                        size={'small'}
                        placeholder="XX市"
                      />
                    )}
                    name="city"
                    control={control}
                    defaultValue={''}
                    rules={{
                      required: {
                        value: true,
                        message: '市区町村は必須です',
                      },
                    }}
                  />
                  <Box style={{ minHeight: 20 }}>
                    {!!errors.city && (
                      <FormErrorMessage msg={errors.city.message} />
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="outlined"
                        label="以降の住所"
                        id="address"
                        error={!!errors.address}
                        size={'small'}
                        required
                      />
                    )}
                    name="address"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: '住所欄は必須です',
                      },
                    }}
                    defaultValue={''}
                  />
                  <Box style={{ minHeight: 20 }}>
                    {!!errors.address && (
                      <FormErrorMessage msg={errors.address.message} />
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    control={control}
                    name="tel"
                    defaultValue=""
                    rules={{
                      required: {
                        value: true,
                        message: '電話番号は必須です',
                      },
                      pattern: {
                        value: strPatterns.tel,
                        message: '電話番号の形式が違います',
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="tel"
                        label="電話番号"
                        variant="outlined"
                        placeholder="ハイフン不要"
                        required
                        fullWidth
                        type="tel"
                        error={!!errors.tel}
                        size={'small'}
                      />
                    )}
                  />
                  <Box style={{ minHeight: 20 }}>
                    {!!errors.tel && (
                      <FormErrorMessage msg={errors.tel.message} />
                    )}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="outlined"
                        required
                        error={!!errors.password}
                        label="管理システム用のパスワード"
                        type={type}
                        id="password"
                        InputProps={iconByType}
                        size={'small'}
                      />
                    )}
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: {
                        value: true,
                        message: '管理システム用のパスワードは必須です',
                      },
                      pattern: {
                        value: strPatterns.password,
                        message: 'パスワードの形式が違います',
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
                    {!!errors.password && (
                      <FormErrorMessage msg={errors.password.message} />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box>
                    <CircularButton
                      loading={loading}
                      submitText={t.common.store}
                      onClick={handleSubmit(onSubmit)}
                      options={options}
                    />
                  </Box>
                </Grid>
              </Grid>
            </form>
          )}
        </div>
        <CustomAlert alertStatus={alertStatus} onClose={onAlertClose} />
      </Container>
    </MypageLayout>
  )
}
export default OrganizationCreate
