import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const BoardItemStyle = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}
function BoardBar() {
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      height: (theme) => theme.trello.boardBarHeight,
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      borderBottom: '1px solid white',
      paddingX: 2,
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Chip
          sx={BoardItemStyle}
          icon={<DashboardIcon />}
          label="Antonio MERN STACK board"
          clickable
        />
        <Chip
          sx={BoardItemStyle}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={BoardItemStyle}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />
        <Chip
          sx={BoardItemStyle}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={BoardItemStyle}
          icon={<FilterListIcon />}
          label="Filters"
          clickable
        />
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <Button
          sx={{
            borderColor: 'white',
            alignItems: 'center',
            lineHeight: 'normal',
            padding: '8px 16px',
            color: 'white',
            '&:hover': { borderColor: 'white' }
          }}
          startIcon={<PersonAddIcon />}
          variant="outlined"
        >Invite
        </Button>
        <AvatarGroup max={7} sx={{
          gap: '10px',
          '& .MuiAvatar-root ': {
            width: 34,
            height: 34,
            fontSize: '1rem',
            cursor: 'pointer',
            border: 'none'
          }
        }}>
          <Tooltip title="antoniovu">
            <Avatar alt="Remy Sharp" src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474230Lgd/hinh-chibi-avatar-dep_031501308.jpg" />
          </Tooltip>
          <Tooltip title="antoniovu">
            <Avatar alt="Remy Sharp" src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474230Lgd/hinh-chibi-avatar-dep_031501308.jpg" />
          </Tooltip>
          <Tooltip title="antoniovu">
            <Avatar alt="Remy Sharp" src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474230Lgd/hinh-chibi-avatar-dep_031501308.jpg" />
          </Tooltip>
          <Tooltip title="antoniovu">
            <Avatar alt="Remy Sharp" src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474230Lgd/hinh-chibi-avatar-dep_031501308.jpg" />
          </Tooltip>
          <Tooltip title="antoniovu">
            <Avatar alt="Remy Sharp" src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474230Lgd/hinh-chibi-avatar-dep_031501308.jpg" />
          </Tooltip>
          <Tooltip title="antoniovu">
            <Avatar alt="Remy Sharp" src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474230Lgd/hinh-chibi-avatar-dep_031501308.jpg" />
          </Tooltip>
          <Tooltip title="antoniovu">
            <Avatar alt="Remy Sharp" src="https://gcs.tripi.vn/public-tripi/tripi-feed/img/474230Lgd/hinh-chibi-avatar-dep_031501308.jpg" />
          </Tooltip>
          <Tooltip title="antoniovu">
            <Avatar alt="Remy Sharp" src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fgcs.tripi.vn%2Fpublic-tripi%2Ftripi-feed%2Fimg%2F474230Lgd%2Fhinh-chibi-avatar-dep_031501308.jpg&tbnid=gKhOEOAJRQlquM&vet=12ahUKEwjm88zCr_qEAxX_TPUHHQzEDGoQMygDegQIARBL..i&imgrefurl=https%3A%2F%2Fmytour.vn%2Fvi%2Fblog%2Fbai-viet%2Fchibi-avatars-cute-avatars-the-most-beautiful-chibi-profile-pictures-of-2024.html&docid=m3MPn4lddNxobM&w=736&h=736&q=avatar%20chibi&ved=2ahUKEwjm88zCr_qEAxX_TPUHHQzEDGoQMygDegQIARBL" />
          </Tooltip>

        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
