import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { drawerWidth } from '@/lib/util'
import { AuthMenu } from '@/components/organisms'
import { Hidden } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      // background: `linear-gradient(165deg, ${darken('#5dff26', 0.1)}, #5cb363)`,
      background: theme.palette.primary.main,
      [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
    toolBarWrap: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    toolBar: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    list: {
      flexGrow: 1,
      padding: `0 ${theme.spacing(1)}px`,
    },
  })
)

interface Props {
  toggleMenu: (flag: string) => void
}

const MypageHeader = ({ toggleMenu }: Props) => {
  const classes = useStyles()
  const handleDrawerToggle = () => {
    toggleMenu('mobile')
  }
  const handleFlexibleDrawerToggle = () => {
    toggleMenu('tablet')
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <div className={classes.toolBarWrap}>
        <Toolbar className={clsx([classes.toolBar, 'container'])}>
          <Hidden mdUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden lgUp smDown implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleFlexibleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <nav className={classes.list}></nav>
          <AuthMenu />
        </Toolbar>
      </div>
    </AppBar>
  )
}

export default MypageHeader
