import React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import ListItemIcon from '@mui/material/ListItemIcon'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'

const COLUMN_HEADER_HEIGH = '50px'
const COLUMN_FOOTER_HEIGH = '56px'
function BoardContent() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement | SVGSVGElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement | SVGSVGElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      height: (theme) => theme.trello.boardContentHeigh,
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
      padding: '10px 0'
    }}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* Column 01 Sample */}
        <Box sx={{
          minWidth: 300,
          maxWidth: 300,
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeigh} - ${theme.spacing(5)})`
        }}>
          {/* Column header */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGH,
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Column Title
            </Typography>
            <Box>
              <Tooltip title="More option">
                <ExpandMoreIcon
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-column-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                />
              </Tooltip>
              <Menu
                id="basic-column-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Column body */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: (theme) => `calc(
              ${theme.trello.boardContentHeigh} - 
              ${theme.spacing(5)} -
              ${COLUMN_HEADER_HEIGH} -
              ${COLUMN_FOOTER_HEIGH}
              )`,
              '&::-webkit-scrollbar-thumb': {
                background: '#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#bfc2cf'
              }
            }}
          >
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://img.freepik.com/free-vector/bokeh-defocused-background_23-2148497833.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>TRELLO MERN STACK</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button startIcon={<GroupIcon />} size="small">20</Button>
                <Button startIcon={<CommentIcon />} size="small">15</Button>
                <Button startIcon={<AttachmentIcon />} size="small">10</Button>
              </CardActions>
            </Card>

            {
              Array(10).fill(1)?.map((_, index) => {
                return (
                  <Card
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                      overflow: 'unset'
                    }}
                  >
                    <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                      <Typography>TRELLO FE</Typography>
                    </CardContent>
                  </Card>
                )
              })
            }

          </Box>
          {/* Column footer */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGH,
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="More option">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
        {/* Column 02 Sample */}
        <Box sx={{
          minWidth: 300,
          maxWidth: 300,
          bgcolor: (theme) => theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeigh} - ${theme.spacing(5)})`
        }}>
          {/* Column header */}
          <Box
            sx={{
              height: COLUMN_HEADER_HEIGH,
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Column Title
            </Typography>
            <Box>
              <Tooltip title="More option">
                <ExpandMoreIcon
                  id="basic-column-dropdown"
                  aria-controls={open ? 'basic-column-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                />
              </Tooltip>
              <Menu
                id="basic-column-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-column-dropdown'
                }}
              >
                <MenuItem>
                  <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                  <ListItemText>Add new card</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                  <ListItemText>Cut</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                  <ListItemText>Paste</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <DeleteForeverIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Remove this column</ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Cloud fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Archive this column</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          {/* Column body */}
          <Box
            sx={{
              p: '0 5px',
              m: '0 5px',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              maxHeight: (theme) => `calc(
              ${theme.trello.boardContentHeigh} - 
              ${theme.spacing(5)} -
              ${COLUMN_HEADER_HEIGH} -
              ${COLUMN_FOOTER_HEIGH}
              )`,
              '&::-webkit-scrollbar-thumb': {
                background: '#ced0da'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#bfc2cf'
              }
            }}
          >
            <Card
              sx={{
                cursor: 'pointer',
                boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                overflow: 'unset'
              }}
            >
              <CardMedia
                sx={{ height: 140 }}
                image="https://img.freepik.com/free-vector/bokeh-defocused-background_23-2148497833.jpg"
                title="green iguana"
              />
              <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                <Typography>TRELLO MERN STACK</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button startIcon={<GroupIcon />} size="small">20</Button>
                <Button startIcon={<CommentIcon />} size="small">15</Button>
                <Button startIcon={<AttachmentIcon />} size="small">10</Button>
              </CardActions>
            </Card>

            {
              Array(2).fill(1)?.map((_, index) => {
                return (
                  <Card
                    key={index}
                    sx={{
                      cursor: 'pointer',
                      boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
                      overflow: 'unset'
                    }}
                  >
                    <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
                      <Typography>TRELLO FE</Typography>
                    </CardContent>
                  </Card>
                )
              })
            }

          </Box>
          {/* Column footer */}
          <Box
            sx={{
              height: COLUMN_FOOTER_HEIGH,
              p: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <Button startIcon={<AddCardIcon />}>Add new card</Button>
            <Tooltip title="More option">
              <DragHandleIcon sx={{ cursor: 'pointer' }} />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}

export default BoardContent