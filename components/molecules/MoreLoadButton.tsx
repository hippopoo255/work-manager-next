import React, { useState } from 'react'
import { CircularButton } from '@/components/molecules'
import { Theme, makeStyles } from '@material-ui/core/styles'

type Props = {
  fetch: () => Promise<void>
}

const useStyles = makeStyles((theme: Theme) => ({
  moreLoader: {
    borderWidth: 2,
    borderRadius: 9999,
    minWidth: 180,
    color: theme.palette.action.active,
    fontWeight: theme.typography.fontWeightBold,
    '&.MuiButton-outlined.Mui-disabled': {
      borderWidth: 2,
    },
  },
}))
const MoreLoadButton = ({ fetch }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const classes = useStyles()

  const handleMore = async () => {
    setLoading(true)
    await fetch().finally(() => {
      setLoading(false)
    })
  }

  const moreLinkOptions = {
    className: classes.moreLoader,
    size: 'large',
  }

  return (
    <CircularButton
      loading={loading}
      onClick={handleMore}
      submitText={'さらに表示'}
      color={'default'}
      variant={'outlined'}
      options={moreLinkOptions}
    />
  )
}

export default MoreLoadButton
