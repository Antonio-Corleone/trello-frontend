import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

function BoardContent() {
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      height: (theme) => theme.trello.boardContentHeigh,
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
      padding: '10px 0'
    }}>
      <ListColumns/>
    </Box >
  )
}

export default BoardContent