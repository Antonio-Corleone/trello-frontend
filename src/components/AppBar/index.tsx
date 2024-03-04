import Box from '@mui/material/Box'
import SelectMode from '@components/ModeSelect/index'

function AppBar() {
  return (
    <Box sx={{
      width: '100%',
      backgroundColor: 'primary.light',
      display: 'flex',
      alignItems: 'center',
      height: (theme) => theme.trello.appBarHeight
    }}>
      <SelectMode />
    </Box>
  )
}

export default AppBar
