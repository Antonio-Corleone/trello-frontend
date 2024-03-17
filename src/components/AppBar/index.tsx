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

import SelectMode from '@components/ModeSelect/index'
import { ReactComponent as TrelloIcon } from '@/assets/trello.svg'
import Workspaces from './Menu/Workspaces'
import Recent from './Menu/Recent'
import Started from './Menu/Started'
import Templates from './Menu/Templates'
import Profiles from './Menu/Profiles'
import TrelloDrawer from './Menu/TrelloDrawer'

function AppBar() {
  return (
    <Box px={2} sx={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: (theme) => theme.trello.appBarHeight
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1 } }}>
        <AppsIcon sx={{ color: 'primary.light', display: { xs: 'none', md: 'flex' } }} />
        <TrelloDrawer />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            sx={{
              color: 'primary.light'
            }}
          />
          <Typography
            variant='body1'
            sx={{
              color: 'primary.light',
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
          <Button startIcon={<LibraryAddIcon />} variant="outlined">Create</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, lg: 2 } }}>
        <TextField id="outlined-search" label="Search field" type="search" size='small' sx={{ width: { md: 120, lg: 190 } }} />
        <SelectMode />
        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon sx={{ color: 'primary.main' }} />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  )
}

export default AppBar
