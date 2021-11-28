import { makeStyles, Theme } from '@material-ui/core/styles'
import { MDE_MAX_HEIGHT } from './util'
const useEditorStyles = makeStyles((theme: Theme) => ({
  mde: {
    display: 'flex',
    position: 'relative',
    maxHeight: MDE_MAX_HEIGHT,
    overflow: 'hidden',
  },
  col: {
    width: '100%',
    flexGrow: 1,
    [theme.breakpoints.up('lg')]: {
      paddingRight: theme.spacing(3),
    },
  },
  previewOperator: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.hint,
    fontStyle: 'italic',
  },
  toggle: {
    marginTop: 8,
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  preview: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    flexGrow: 1,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
    padding: theme.spacing(2),
    background: theme.palette.background.paper,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard,
    }),
    [theme.breakpoints.up('lg')]: {
      position: 'relative',
      height: 'initial',
      padding: 0,
    },
  },
  hidden: {
    transform: 'translate3d(calc(100% + 16px), 0, 0)',
    [theme.breakpoints.up('lg')]: {
      transform: 'none',
    },
  },
}))

export default useEditorStyles
