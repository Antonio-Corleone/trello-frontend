import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const custom = {
  trello: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  }
} as const

// Update for Typescript
type CustomTheme = {
  [Key in keyof typeof custom]: typeof custom[Key];
};
declare module '@mui/material' {
  interface Theme extends CustomTheme {}
}
// Create theme
const theme = extendTheme({
  ...custom,
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
})

export default theme