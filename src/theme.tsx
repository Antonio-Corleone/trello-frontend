import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme, CssVarsThemeOptions } from '@mui/material/styles'
export interface TrelloTheme extends CssVarsThemeOptions {
  trello: {
    appBarHeight: string,
    boardBarHeight: string
  }
}

const theme = extendTheme({
  trello: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  }
  // ...other properties
} as TrelloTheme)

export default theme