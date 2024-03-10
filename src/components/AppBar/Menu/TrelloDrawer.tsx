import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import AppsIcon from '@mui/icons-material/Apps'
// import Workspaces from './Workspaces'
// import Recent from './Recent'
// import Started from './Started'
// import Templates from './Templates'

export default function TrelloDrawer() {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" >
      <List>
        {['Workspaces', 'Recent', 'Started', 'Templates'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon sx={{ color: 'primary.main' }} /> : <MailIcon sx={{ color: 'primary.main' }} />}
              </ListItemIcon>
              <ListItemText sx={{ color: 'primary.main' }} primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <List>
        <ListItem key={'workspaces'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <Workspaces />
          </ListItemButton>
        </ListItem>
        <ListItem key={'recent'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <Recent />
          </ListItemButton>
        </ListItem>
        <ListItem key={'started'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <Started />
          </ListItemButton>
        </ListItem>
        <ListItem key={'templates'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <Templates />
          </ListItemButton>
        </ListItem>
      </List> */}
      <Divider />
    </Box>
  )

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <AppsIcon onClick={toggleDrawer(true)} sx={{ color: 'primary.light', cursor: 'pointer' }} />
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </Box>
  )
}