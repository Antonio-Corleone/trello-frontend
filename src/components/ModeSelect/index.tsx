import React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Box, useColorScheme } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'

type Mode = 'light' | 'dark' | 'system'

export default function SelectMode() {
  const { mode, setMode } = useColorScheme()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const renderIconMode = (mode: Mode) => {
    let modeIcon
    if (mode === 'light') {
      modeIcon = <LightModeIcon />
    }
    if (mode === 'dark') {
      modeIcon = <DarkModeOutlinedIcon />
    }
    if (mode === 'system') {
      modeIcon = <SettingsBrightnessIcon />
    }
    return modeIcon
  }
  const handleChange = (event: SelectChangeEvent) => {
    const selectedMode = event?.target?.value as Mode
    setMode(selectedMode)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <FormControl size="small">
      <InputLabel sx={{ display: { xs: 'flex', md: 'none', lg: 'flex' } }} id="select-dart-light-mode">Mode</InputLabel>
      <Select
        labelId="select-dart-light-mode"
        id="dart-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{ display: { xs: 'flex', md: 'none', lg: 'flex' } }}
      >
        <MenuItem value='light'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize='small' />Light
          </Box>
        </MenuItem>
        <MenuItem value='dark'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize='small' />Dark
          </Box>
        </MenuItem>
        <MenuItem value='system'>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon fontSize='small' />System
          </Box>
        </MenuItem>
      </Select>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        sx={{
          padding: 0,
          color: 'primary.main',
          display: { xs: 'none', md: 'flex', lg: 'none' }
        }}
      >
        {renderIconMode(mode as Mode)}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          setMode('light')
          handleClose()
        }}>Light</MenuItem>
        <MenuItem onClick={() => {
          setMode('dark')
          handleClose()
        }}>Dark</MenuItem>
        <MenuItem onClick={() => {
          setMode('system')
          handleClose()
        }}>System</MenuItem>
      </Menu>
    </FormControl>
  )
}
