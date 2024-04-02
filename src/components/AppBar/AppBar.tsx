import { useState } from 'react'
import Box from '@mui/material/Box'
import AppsIcon from '@mui/icons-material/Apps'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Tooltip from '@mui/material/Tooltip'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

import SelectMode from '@/components/ModeSelect/ModeSelect'
import { ReactComponent as TrelloIcon } from '@/assets/trello.svg'
import Workspaces from './Menu/Workspaces'
import Recent from './Menu/Recent'
import Started from './Menu/Started'
import Templates from './Menu/Templates'
import Profiles from './Menu/Profiles'
import TrelloDrawer from './Menu/TrelloDrawer'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: (theme) => theme.trello.appBarHeight,
      paddingX: 2,
      gap: 2,
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1 } }}>
        <AppsIcon sx={{ color: 'white', display: { xs: 'none', md: 'flex' } }} />
        <TrelloDrawer />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            sx={{
              color: 'white'
            }}
          />
          <Typography
            variant='body1'
            sx={{
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              display: { xs: 'none', lg: 'inline-block' }
            }}
          >Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
          <Workspaces />
          <Recent />
          <Started />
          <Templates />
          <Button
            startIcon={<LibraryAddIcon />}
            variant="outlined"
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': {
                border: 'none',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#718093' : '#0984e3'
              }
            }}
          >Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, lg: 2 } }}>
        <TextField
          id="outlined-search"
          label="Search field"
          type="text"
          size='small'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon
                  onClick={() => setSearchValue('')}
                  sx={{
                    color: 'white',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: `${searchValue?.length > 0 ? 'inline' : 'none'}`
                  }}
                />
              </InputAdornment>
            )
          }}
          sx={{
            width: { md: 120, lg: 180 },
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white'
              },
              '&:hover fieldset': {
                borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              }
            }
          }}
        />
        <SelectMode />
        <Tooltip title="Notification">
          <Badge color="warning" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'white' }} />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
