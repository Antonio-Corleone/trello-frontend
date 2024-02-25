import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import SelectMode from './ModeSelect'

function App() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Box sx={{
        width: '100%',
        backgroundColor: 'primary.light',
        display: 'flex',
        alignItems: 'center',
        height: (theme) => theme.trello.appBarHeight
      }}>
        <SelectMode />
      </Box>
      <Box sx={{
        width: '100%',
        backgroundColor: 'primary.dark',
        display: 'flex',
        alignItems: 'center',
        height: (theme) => theme.trello.boardBarHeight
      }}>
        Board Bar
      </Box>
      <Box sx={{
        width: '100%',
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        height: (theme) => `calc( 100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`
      }}>
        Main content
      </Box>

    </Container>
  )
}

export default App