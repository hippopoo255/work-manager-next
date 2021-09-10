import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { MypageLayout } from '@/layouts'
import { MypageTitle, FormErrorMessage } from '@/components/atoms'
import { FormTitle, HelpBox, CircularButton } from '@/components/molecules'
import { makeStyles, Theme } from '@material-ui/core'
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import { useForm, Controller } from 'react-hook-form'
import { strPatterns } from '@/lib/util'
import { getRequest, putRequest, requestUri } from '@/api'
import { User } from '@/interfaces/models'
import { NotifyStatus } from '@/interfaces/common'
import { SettingSubmit } from '@/interfaces/form/submit'
import { SettingInputs } from '@/interfaces/form/inputs'
import { useAuth } from '@/hooks'
import { AlertStatus } from '@/interfaces/common'
import { initialAlertStatus } from '@/lib/initialData'
import { CustomAlert } from '@/components/atoms'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  top: {
    paddingTop: theme.spacing(4),
    // paddingBottom: theme.spacing(4),
  },
  wrap: {
    width: 500,
    maxWidth: '100%',
    margin: '0 auto',
  },
  footer: {
    justifyContent: 'center',
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  checkRow: {
    display: 'flex',
    alignItems: 'center',
  },
  err: {
    minHeight: 20,
    textAlign: 'left',
  },
}))

const Index = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [alertStatus, setAlertStatus] = useState<AlertStatus>({
    ...initialAlertStatus,
  })
  const [notifyStatus, setNotifyStatus] = useState<NotifyStatus[]>([])
  const user = useAuth()
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
  } = useForm<SettingInputs>()

  const comparePassword = watch('password', '')

  const handleAlertClose = () => {
    setAlertStatus((prev) => ({
      ...prev,
      show: false,
    }))
  }

  const handleChangePassword = () => {
    setValue('change_password', !getValues('change_password'))
    clearErrors('current_password')
    clearErrors('password')
    clearErrors('password_confirmation')
    setValue('current_password', '')
    setValue('password', '')
    setValue('password_confirmation', '')
  }

  const handleUpdate = async (data: SettingInputs) => {
    if (!!user) {
      setLoading(true)
      const submitData = new FormData()
      Object.keys(data.notify_validation).forEach((key) => {
        submitData.append(
          `notify_validation[${key}]`,
          !!data.notify_validation[key] ? '1' : '0'
        )
      })

      submitData.append('change_password', data.change_password ? '1' : '0')
      if (data.change_password) {
        submitData.append('current_password', data.current_password!)
        submitData.append('password', data.password!)
        submitData.append('password_confirmation', data.password_confirmation!)
      }

      await putRequest<User, FormData>(`/user/${user.id}/setting`, submitData)
        .then((updateUser: User) => {
          setAlertStatus((prev) => ({
            ...prev,
            msg: '設定を更新しました',
            severity: 'success',
            show: true,
          }))
        })
        .catch((err) => {
          setAlertStatus((prev) => ({
            ...prev,
            msg: '設定の更新に失敗しました',
            severity: 'error',
            show: true,
          }))
          if (err.status === 422) {
            const errBody: { [k: string]: string[] } = err.data.errors
            Object.keys(errBody).forEach((key: string) => {
              const targetKey: any = key
              setError(targetKey, {
                type: 'invalid',
                message: errBody[key][0],
              })
            })
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  useEffect(() => {
    const fetchNotifyStatus = async () => {
      if (!!user) {
        await getRequest<NotifyStatus[]>(
          requestUri.notifyStatus + `${user.id}/notify_validation`,
          (err) => {
            console.error(err)
          }
        ).then((fetchedStatus) => {
          setNotifyStatus((prev) => [...fetchedStatus])
        })
      }
    }
    fetchNotifyStatus()
  }, [user])

  return (
    <MypageLayout title="設定">
      <MypageTitle>
        <div className="container">設定</div>
      </MypageTitle>
      <section>
        <Card className={clsx(['container', classes.top])}>
          <div>
            <div className={classes.wrap}>
              <FormTitle title={'設定'} icon={<SettingsOutlinedIcon />} />
            </div>
            <form onSubmit={handleSubmit(handleUpdate)}>
              <CardContent className={classes.wrap}>
                <Grid container spacing={2} className={classes.wrap}>
                  {!!notifyStatus.length && (
                    <Grid item xs={12}>
                      <Typography component={'h4'} variant={'h4'} gutterBottom>
                        メール通知設定
                      </Typography>
                      {notifyStatus.map((sts: NotifyStatus, index) => (
                        <Controller
                          key={sts.key}
                          name={`notify_validation.${sts.id}`}
                          defaultValue={!!sts.is_valid}
                          control={control}
                          render={({ field }) => (
                            <FormControlLabel
                              {...field}
                              control={
                                <Switch
                                  color={'primary'}
                                  checked={
                                    !!getValues(`notify_validation.${sts.id}`)
                                  }
                                />
                              }
                              label={sts.label_name}
                            />
                          )}
                        />
                      ))}
                    </Grid>
                  )}
                  <Grid item xs={12} className={classes.checkRow}>
                    <Controller
                      control={control}
                      name="change_password"
                      render={({ field }) => (
                        <FormControlLabel
                          {...field}
                          control={
                            <Checkbox
                              checked={getValues('change_password')}
                              onChange={handleChangePassword}
                              name="change_password"
                              color="primary"
                            />
                          }
                          label="パスワードを変更する"
                        />
                      )}
                    />
                    <HelpBox />
                  </Grid>
                  {getValues('change_password') && (
                    <>
                      <Grid item xs={12} spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Controller
                            control={control}
                            name="current_password"
                            rules={{
                              required: {
                                value: getValues('change_password'),
                                message: '現在のパスワードを指定して下さい',
                              },
                              minLength: {
                                value: 8,
                                message:
                                  '現在のパスワードは8文字以上64文字以下です',
                              },
                              maxLength: {
                                value: 64,
                                message:
                                  '現在のパスワードは8文字以上64文字以下です',
                              },
                            }}
                            render={({ field }) => (
                              <TextField
                                {...field}
                                id="current_password"
                                label="現在のパスワード"
                                variant="outlined"
                                type="password"
                                placeholder="半角英数字"
                                size={'small'}
                                fullWidth
                                error={!!errors.current_password}
                              />
                            )}
                          />
                          <p className={classes.err}>
                            {!!errors.current_password && (
                              <FormErrorMessage
                                msg={errors.current_password.message}
                              />
                            )}
                          </p>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Controller
                          control={control}
                          name="password"
                          rules={{
                            required: {
                              value: getValues('change_password'),
                              message: '新しいパスワードを指定して下さい',
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
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="password"
                              label="新しいパスワード"
                              variant="outlined"
                              type="password"
                              placeholder="半角英数字"
                              size={'small'}
                              fullWidth
                              error={!!errors.password}
                            />
                          )}
                        />
                        <p className={classes.err}>
                          {!!errors.password && (
                            <FormErrorMessage msg={errors.password.message} />
                          )}
                        </p>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Controller
                          control={control}
                          name="password_confirmation"
                          rules={{
                            required: {
                              value: getValues('change_password'),
                              message: '新しいパスワードを指定して下さい',
                            },
                            pattern: {
                              value: strPatterns.confirm(comparePassword!),
                              message: '新しいパスワードと一致しません',
                            },
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="password_confirmation"
                              label="新しいパスワード（確認）"
                              variant="outlined"
                              type="password"
                              placeholder="半角英数字"
                              size={'small'}
                              fullWidth
                              error={!!errors.password_confirmation}
                            />
                          )}
                        />
                        <p className={classes.err}>
                          {!!errors.password_confirmation && (
                            <FormErrorMessage
                              msg={errors.password_confirmation.message}
                            />
                          )}
                        </p>
                      </Grid>
                    </>
                  )}
                </Grid>
              </CardContent>
              <Divider />
              <CardActions className={classes.footer}>
                <div className={classes.wrap}>
                  <CircularButton
                    loading={loading}
                    onClick={handleSubmit(handleUpdate)}
                  />
                </div>
              </CardActions>
            </form>
          </div>
        </Card>
      </section>
      <CustomAlert alertStatus={alertStatus} onClose={handleAlertClose} />
    </MypageLayout>
  )
}

export default Index
