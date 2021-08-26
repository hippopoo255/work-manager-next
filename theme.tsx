import { createTheme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
const theme = createTheme({
  palette: {
    primary: {
      main: '#43a047',
      dark: '#2d7130',
      light: '#9beb9f',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0188CB',
      dark: '#2661A1',
      light: '#9ccbeb',
      contrastText: '#000',
    },
    common: {
      black: '#444444',
    },
    success: {
      main: '#43a047',
      dark: '#2d7130',
      light: '#87dd8b',
    },
  },
  typography: {
    fontFamily: ['"Noto Sans JP Light"', 'Roboto', 'sans-serif'].join(', '),
    button: {
      textTransform: 'none',
    },
    h1: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 'normal',
    },
  },
})
export default theme
