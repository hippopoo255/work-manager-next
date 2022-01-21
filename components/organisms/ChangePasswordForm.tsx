import React from 'react'
// import { Grid, TextField, Typography, Divider } from '@material-ui/core'
// import { Theme, makeStyles } from '@material-ui/core/styles'
import { useForm, Controller, Control } from 'react-hook-form'
// import { FormErrorMessage } from '@/components/atoms'
// import { HelpBox } from '@/components/molecules'
// import { strPatterns } from '@/lib/util'
//
// const useStyles = makeStyles((theme: Theme) => ({
//   checkRow: {
//     display: 'flex',
//     alignItems: 'center',
//   },
//   err: {
//     minHeight: 20,
//     textAlign: 'left',
//   },
// }))
//
type Props = {
  control: Control<any>
}
//
const ChangePasswordForm = ({ control }: Props) => {
  //   const classes = useStyles()
  return (
    <div></div>
    // <>
    //       <Grid item xs={12} style={{ marginTop: 12 }}>
    //         <Grid container spacing={2}>
    //           <Grid item xs={12}>
    //             <Typography component={'h4'} variant={'h4'} gutterBottom>
    //               パスワードの変更
    //               <HelpBox />
    //             </Typography>
    //             <Divider style={{ marginTop: 12 }} />
    //           </Grid>
    //           <Grid item xs={12} className={classes.checkRow}></Grid>
    //         </Grid>
    //       </Grid>
    //       {
    //         <>
    //           <Grid item xs={12} spacing={2}>
    //             <Grid item xs={12} md={6}>
    //               <Controller
    //                 control={control}
    //                 name="change_password.old_password"
    //                 rules={{
    //                   required: {
    //                     value: true,
    //                     message: '現在のパスワードを指定して下さい',
    //                   },
    //                   minLength: {
    //                     value: 8,
    //                     message: '現在のパスワードは8文字以上64文字以下です',
    //                   },
    //                   maxLength: {
    //                     value: 64,
    //                     message: '現在のパスワードは8文字以上64文字以下です',
    //                   },
    //                 }}
    //                 render={({ field }) => (
    //                   <TextField
    //                     {...field}
    //                     id="change_password.old_password"
    //                     label="現在のパスワード"
    //                     variant="outlined"
    //                     type="password"
    //                     placeholder="半角英数字"
    //                     size={'small'}
    //                     fullWidth
    //                     error={!!errors.change_password?.old_password}
    //                   />
    //                 )}
    //               />
    //               <p className={classes.err}>
    //                 {!!errors.change_password?.old_password && (
    //                   <FormErrorMessage
    //                     msg={errors.change_password?.old_password.message}
    //                   />
    //                 )}
    //               </p>
    //             </Grid>
    //           </Grid>
    //           <Grid item xs={12} sm={6}>
    //             <Controller
    //               control={control}
    //               name="change_password.password"
    //               rules={{
    //                 required: {
    //                   value: currentTab === 1,
    //                   message: '新しいパスワードを指定して下さい',
    //                 },
    //                 pattern: {
    //                   value: strPatterns.password,
    //                   message: 'パスワードの形式が違います',
    //                 },
    //                 minLength: {
    //                   value: 8,
    //                   message: '8文字以上64文字以下で入力してください',
    //                 },
    //                 maxLength: {
    //                   value: 64,
    //                   message: '8文字以上64文字以下で入力してください',
    //                 },
    //               }}
    //               render={({ field }) => (
    //                 <TextField
    //                   {...field}
    //                   id="change_password.password"
    //                   label="新しいパスワード"
    //                   variant="outlined"
    //                   type="password"
    //                   placeholder="半角英数字"
    //                   size={'small'}
    //                   fullWidth
    //                   error={!!errors.change_password?.password}
    //                 />
    //               )}
    //             />
    //             <p className={classes.err}>
    //               {!!errors.change_password?.password && (
    //                 <FormErrorMessage
    //                   msg={errors.change_password?.password.message}
    //                 />
    //               )}
    //             </p>
    //           </Grid>
    //         </>
    //       }
    // </>
  )
}

export default ChangePasswordForm
