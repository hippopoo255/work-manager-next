import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Button, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    paddingTop: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      background: theme.palette.common.white,
    },
  },
  fieldClear: {
    flexShrink: 0,
  },
}))

type Props = {
  onSearchClear: () => void
  currentTotalCount: number
}

const RecordCountBar = ({ onSearchClear, currentTotalCount = 0 }: Props) => {
  const classes = useStyles()
  return (
    <Box className={classes.footer}>
      <Grid
        container
        spacing={2}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Grid item classes={{ item: classes.fieldClear }}>
          <Button
            variant={'outlined'}
            color={'primary'}
            size={'small'}
            onClick={onSearchClear}
          >
            検索クリア
          </Button>
        </Grid>
        <Grid item>
          <Typography color={'textSecondary'} variant={'body2'}>
            検索結果：<strong>{currentTotalCount}</strong>件
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default RecordCountBar
