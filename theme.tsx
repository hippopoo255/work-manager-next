import { createTheme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'
const theme = createTheme({
  palette: {
    primary: {
      main: '#3bb95b',
      dark: '#048f27',
      light: '#3fe068',
      contrastText: '#fff',
    },
    secondary: {
      light: orange[300],
      main: '#f6a522',
      dark: '#d66304',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ['"Noto Sans JP Light"', 'Roboto', 'sans-serif'].join(', '),
  },
})
export default theme
