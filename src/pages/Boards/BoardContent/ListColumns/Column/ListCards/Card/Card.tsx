import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'

interface CardTypes {
  showCardMedia?: boolean
  cardTitle: string
}
function Card({ showCardMedia, cardTitle }: CardTypes) {
  return (
    <>
      {showCardMedia ?
        (
          <MuiCard
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
              <Typography>{cardTitle}</Typography>
            </CardContent>
            <CardActions sx={{ p: '0 4px 8px 4px' }}>
              <Button startIcon={<GroupIcon />} size="small">20</Button>
              <Button startIcon={<CommentIcon />} size="small">15</Button>
              <Button startIcon={<AttachmentIcon />} size="small">10</Button>
            </CardActions>
          </MuiCard>
        ) :
        (
          <MuiCard
            sx={{
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
              overflow: 'unset'
            }}
          >
            <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
              <Typography>{cardTitle}</Typography>
            </CardContent>
          </MuiCard>
        )}
    </>
  )
}

export default Card