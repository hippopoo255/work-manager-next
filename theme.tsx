import { createTheme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
const theme = createTheme({
  palette: {
    primary: {
      main: '#3bb95b',
      dark: '#048f27',
      light: '#52cc70',
      contrastText: '#fff',
    },
    secondary: {
      light: orange[300],
      main: '#f6a522',
      dark: '#d66304',
      contrastText: '#000',
    },
    common: {
      black: '#444444',
    },
  },
  typography: {
    fontFamily: ['"Noto Sans JP Light"', 'Roboto', 'sans-serif'].join(', '),
    button: {
      textTransform: 'none',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 'normal',
    },
  },
})
export default theme
