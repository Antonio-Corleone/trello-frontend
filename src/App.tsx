import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import SelectMode from './ModeSelect'
import { TrelloTheme } from './theme'
import { Theme } from '@mui/material'

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box sx={{
        width: '100%',
        backgroundColor: 'primary.light',
        display: 'flex',
        alignItems: 'center',
        height: (theme: Theme | TrelloTheme) => {
          const custom = theme as TrelloTheme
          return custom.trello.appBarHeight
        }
      }}>
        <SelectMode />
      </Box>
      <Box sx={{
        width: '100%',
        backgroundColor: 'primary.dark',
        display: 'flex',
        alignItems: 'center',
        height: (theme: Theme | TrelloTheme) => {
          const custom = theme as TrelloTheme
          return custom.trello.boardBarHeight
        }
      }}>
        Board Bar
      </Box>
      <Box sx={{
        width: '100%',
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        height: (theme: Theme | TrelloTheme) => {
          const custom = theme as TrelloTheme
          return `calc( 100vh - ${custom.trello.appBarHeight} - ${custom.trello.boardBarHeight})`
        }
      }}>
        Main content
      </Box>

    </Container>
  )
}

export default App
