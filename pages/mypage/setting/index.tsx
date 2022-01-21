import React, { useState } from 'react'
import clsx from 'clsx'
import { MypageLayout } from '@/layouts'
import { MypageTitle, FormErrorMessage } from '@/components/atoms'
import {
  FormTitle,
  HelpBox,
  CircularButton,
  CustomLoader,
  CustomTabs,
} from '@/components/molecules'
import { makeStyles, Theme } from '@material-ui/core'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import { useForm, Controller } from 'react-hook-form'
import { strPatterns } from '@/lib/util'
import { NotifyStatus, AlertStatus, TabItem } from '@/interfaces/common'
import { SettingInputs, PasswordResetInputs } from '@/interfaces/form/inputs'
import { CustomAlert } from '@/components/atoms'
import { useChangePassword, useNotifyValidation } from '@/hooks'
import { initialAlertStatus } from '@/lib/initialData'

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
  swicthText: {
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightBold,
    marginTop: theme.spacing(2),
  },
}))

type NotifyValidationMethod = (
  inputs: SettingInputs['notify_validation']
) => Promise<void>
type ChangePasswordMethod = (
  inputs: SettingInputs['change_password']
) => Promise<void>

interface SettingTabItem extends TabItem {
  inputKey: keyof SettingInputs
  method: NotifyValidationMethod | ChangePasswordMethod
}

const Index = () => {
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [formLoading, setFormLoading] = useState<boolean>(false)
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
  } = useForm<SettingInputs>({
    defaultValues: {
      change_password: {
        old_password: '',
        password: '',
        password_confirmation: '',
      },
    },
  })

  const {
    dailyNotifyValidation,
    loading,
    notifyValidation,
    updateNotifyValidation,
  } = useNotifyValidation({
    setError,
    setAlertStatus,
  })

  const { changePassword } = useChangePassword({ setError, setAlertStatus })

  const tabList: SettingTabItem[] = [
    {
      label: '通知設定',
      inputKey: 'notify_validation',
      method: updateNotifyValidation,
    },
    {
      label: 'パスワード変更',
      inputKey: 'change_password',
      method: changePassword,
    },
  ]

  const comparePassword = watch('change_password.password', '')

  const handleAlertClose = () => {
    setAlertStatus((prev) => ({
      ...prev,
      show: false,
    }))
  }

  const handleUpdate = async (data: SettingInputs) => {
    setFormLoading(true)
    const dataKey = tabList[currentTab].inputKey as keyof SettingInputs
    const updateMethod = tabList[currentTab].method
    const inputs = data[dataKey] as {
      [k: string]: boolean
    } & PasswordResetInputs
    await updateMethod(inputs).finally(() => {
      setFormLoading(false)
    })
  }

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
                <Box mb={3}>
                  <CustomTabs
                    tabList={tabList}
                    value={currentTab}
                    setValue={setCurrentTab}
                    variant={'fullWidth'}
                  />
                </Box>
                <Grid container spacing={2} className={classes.wrap}>
                  {currentTab === 0 && (
                    <Grid item xs={12}>
                      <Typography component={'h4'} variant={'h4'} gutterBottom>
                        メール配信設定
                      </Typography>
                      <Divider style={{ marginTop: 12 }} />
                      <List>
                        {loading || !notifyValidation.length ? (
                          <CustomLoader />
                        ) : (
                          notifyValidation.map((sts: NotifyStatus, index) => (
                            <ListItem key={sts.key} dense>
                              <Controller
                                name={`notify_validation.${sts.id}`}
                                defaultValue={!!sts.is_valid}
                                control={control}
                                render={({ field }) => (
                                  <FormControlLabel
                                    {...field}
                                    control={
                                      <Switch
                                        color={'primary'}
                                        // size={'small'}
                                        checked={
                                          !!getValues(
                                            `notify_validation.${sts.id}`
                                          )
                                        }
                                      />
                                    }
                                    label={sts.label_name}
                                    classes={{
                                      label: classes.swicthText,
                                    }}
                                  />
                                )}
                              />
                            </ListItem>
                          ))
                        )}
                        <ListItem dense>
                          <ListItemText
                            primaryTypographyProps={{
                              color: 'primary',
                              variant: 'subtitle1',
                              component: 'h5',
                              classes: {
                                subtitle1: classes.subtitle,
                              },
                            }}
                          >
                            デイリー配信
                          </ListItemText>
                        </ListItem>
                        {dailyNotifyValidation.map(
                          (sts: NotifyStatus, index) => (
                            <ListItem key={sts.key} dense>
                              <Controller
                                name={`notify_validation.${sts.id}`}
                                defaultValue={!!sts.is_valid}
                                control={control}
                                render={({ field }) => (
                                  <FormControlLabel
                                    {...field}
                                    control={
                                      <Switch
                                        color={'primary'}
                                        // size={'small'}
                                        checked={
                                          !!getValues(
                                            `notify_validation.${sts.id}`
                                          )
                                        }
                                      />
                                    }
                                    label={sts.label_name}
                                    classes={{
                                      label: classes.swicthText,
                                    }}
                                  />
                                )}
                              />
                            </ListItem>
                          )
                        )}
                      </List>
                    </Grid>
                  )}
                  {currentTab === 1 && (
                    <>
                      <Grid item xs={12}>
                        <Box display={'flex'} alignItems={'center'} gridGap={8}>
                          <Typography component={'h4'} variant={'h4'}>
                            パスワードの変更
                          </Typography>
                          <HelpBox />
                        </Box>
                        <Divider style={{ margin: `12px 0 24px` }} />
                      </Grid>

                      <Grid item xs={12}>
                        <Controller
                          control={control}
                          name="change_password.old_password"
                          rules={{
                            required: {
                              value: currentTab === 1,
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
                              id="change_password.old_password"
                              label="現在のパスワード"
                              variant="outlined"
                              type="password"
                              placeholder="半角英数字"
                              size={'small'}
                              fullWidth
                              error={!!errors.change_password?.old_password}
                            />
                          )}
                        />
                        <p className={classes.err}>
                          {!!errors.change_password?.old_password && (
                            <FormErrorMessage
                              msg={errors.change_password?.old_password.message}
                            />
                          )}
                        </p>
                      </Grid>
                      <Grid item xs={12}>
                        <Controller
                          control={control}
                          name="change_password.password"
                          rules={{
                            required: {
                              value: currentTab === 1,
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
                              id="change_password.password"
                              label="新しいパスワード"
                              variant="outlined"
                              type="password"
                              placeholder="半角英数字"
                              size={'small'}
                              fullWidth
                              error={!!errors.change_password?.password}
                            />
                          )}
                        />
                        <p className={classes.err}>
                          {!!errors.change_password?.password && (
                            <FormErrorMessage
                              msg={errors.change_password?.password.message}
                            />
                          )}
                        </p>
                      </Grid>
                      <Grid item xs={12}>
                        <Controller
                          control={control}
                          name="change_password.password_confirmation"
                          rules={{
                            required: {
                              value: currentTab === 1,
                              message: '新しいパスワードを指定して下さい',
                            },
                            minLength: {
                              value: 8,
                              message: '8文字以上64文字以下で入力してください',
                            },
                            maxLength: {
                              value: 64,
                              message: '8文字以上64文字以下で入力してください',
                            },
                            pattern: {
                              value: strPatterns.confirm(comparePassword!),
                              message: '新しいパスワードと一致しません',
                            },
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="change_password.password_confirmation"
                              label="新しいパスワード(確認)"
                              variant="outlined"
                              type="password"
                              placeholder="半角英数字"
                              size={'small'}
                              fullWidth
                              error={
                                !!errors.change_password?.password_confirmation
                              }
                            />
                          )}
                        />
                        <p className={classes.err}>
                          {!!errors.change_password?.password_confirmation && (
                            <FormErrorMessage
                              msg={
                                errors.change_password?.password_confirmation
                                  .message
                              }
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
                    loading={formLoading}
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
