import Link from 'next/link'
import { AppBar, Typography, Toolbar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import clsx from 'clsx'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { darken } from '@material-ui/core'
import { User } from '@/interfaces/models'
import { drawerWidth } from '@/lib/util'
import { SiteLogo } from '@/components/atoms'
import { AvatarMenu } from '@/components/molecules'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: `linear-gradient(165deg, ${darken('#5dff26', 0.1)}, #5cb363)`,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
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
    title: {
      flexGrow: 1,
    },
  })
)

interface Props {
  user: User | ''
  toggleMenu: () => void
}

const MypageHeader = ({ user, toggleMenu }: Props) => {
  const classes = useStyles()
  const handleDrawerToggle = () => {
    toggleMenu()
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <div className={classes.toolBarWrap}>
        <Toolbar className={clsx([classes.toolBar, 'container'])}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.title}>
            <SiteLogo />
          </div>
          {!!user && <AvatarMenu user={user} />}
        </Toolbar>
      </div>
    </AppBar>
  )
}

export default MypageHeader
