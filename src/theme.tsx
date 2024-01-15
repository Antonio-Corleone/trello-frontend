import { createTheme } from '@mui/material/styles'
import { green, pink, red } from '@mui/material/colors'
// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    },
    text: {
      primary: green[200],
      secondary: pink[300]
    }
  }
})

export default theme