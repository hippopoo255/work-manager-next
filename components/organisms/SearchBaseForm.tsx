import React from 'react'
import clsx from 'clsx'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Button, Grid, Typography } from '@material-ui/core'
import { CustomLoader, RecordCountBar } from '@/components/molecules'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: `0 0 ${theme.spacing(2)}px`,
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      position: 'relative',
      overflowY: 'hidden',
      overflowX: 'hidden',
    },
  },
  boxHeight: {
    [theme.breakpoints.down('xs')]: {
      height: 200,
    },
  },
  form: {
    height: '100%',
  },
  fields: {
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      height: '100%',
      overflowY: 'scroll',
      paddingBottom: theme.spacing(5),
    },
  },
  // footer: {
  //   paddingTop: theme.spacing(2),
  //   borderTop: `1px solid ${theme.palette.divider}`,
  //   [theme.breakpoints.down('xs')]: {
  //     position: 'absolute',
  //     bottom: 0,
  //     left: 0,
  //     width: '100%',
  //     padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
  //     background: theme.palette.common.white,
  //   },
  // },
  loaderPaper: {
    position: 'absolute',
    top: 0,
    left: -16,
    right: -16,
    height: '100%',
    background: 'rgba(255,255,255,0.5)',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
      pointerEvents: 'none',
    },
  },
  fieldClear: {
    flexShrink: 0,
  },
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
}))

export type Props = {
  loading: boolean
  onClear: () => void
  onSubmit: any
  currentTotalCount: number
  children: React.ReactNode
  classes?: any
}

const SearchBaseForm = ({
  currentTotalCount = 0,
  loading,
  onClear,
  onSubmit,
  children,
  classes,
}: Props) => {
  const defaultClass = { ...useStyles(), ...classes }

  const handleClear = async () => {
    await onClear()
  }

  return (
    <div className={clsx([defaultClass.root, defaultClass.boxHeight])}>
      <form noValidate onSubmit={onSubmit} className={defaultClass.form}>
        <Grid
          container
          alignItems="flex-start"
          spacing={2}
          className={defaultClass.fields}
        >
          {children}
        </Grid>
        <Box className={defaultClass.footer}>
          <RecordCountBar
            currentTotalCount={currentTotalCount}
            onSearchClear={handleClear}
          />
        </Box>
      </form>
      {loading && (
        <Box className={defaultClass.loaderPaper}>
          <CustomLoader />
        </Box>
      )}
    </div>
  )
}

export default SearchBaseForm
