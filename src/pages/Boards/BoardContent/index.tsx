import Box from '@mui/material/Box'

function BoardContent() {
  return (
    <Box sx={{
      width: '100%',
      backgroundColor: 'primary.main',
      display: 'flex',
      alignItems: 'center',
      height: (theme) => `calc( 100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
    }}>
      Main content
    </Box>
  )
}

export default BoardContent