import Box from '@mui/material/Box'

function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      backgroundColor: 'primary.dark',
      display: 'flex',
      alignItems: 'center',
      height: (theme) => theme.trello.boardBarHeight
    }}>
      Board Bar
    </Box>
  )
}

export default BoardBar
