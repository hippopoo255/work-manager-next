import { createTheme } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/lightBlue'
const theme = createTheme({
  palette: {
    primary: {
      main: '#04a72e',
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
})
export default theme
