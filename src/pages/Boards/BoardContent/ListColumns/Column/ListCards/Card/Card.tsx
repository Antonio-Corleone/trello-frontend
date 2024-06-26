import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import GroupIcon from '@mui/icons-material/Group'
import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { TrelloCard } from '@/interfaces/TrelloBoard'

interface CardTypes {
  card: TrelloCard
}
function Card({ card }: CardTypes) {
  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  // Implement DnD Kit
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card }
  })

  const dndKitCardStyle: React.CSSProperties = {
    // touchAction: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  }
  return (
    <>
      <MuiCard
        ref={setNodeRef}
        style={dndKitCardStyle}
        {...attributes}
        {...listeners}
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
          overflow: 'unset',
          display: card?.FE_PlaceholderCard ? 'none' : 'block'
        }}
      >
        {card?.cover &&
          <CardMedia
            sx={{ height: 140 }}
            image={card?.cover}
            title="green iguana"
          />
        }
        <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>{card?.title}</Typography>
          {card?.description &&
            <Typography variant="body2" color="text.secondary">
              {card?.description}
            </Typography>
          }
        </CardContent>
        {shouldShowCardActions() && <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {!!card?.memberIds?.length && <Button startIcon={<GroupIcon />} size="small">{card?.memberIds?.length}</Button>}
          {!!card?.comments?.length && <Button startIcon={<CommentIcon />} size="small">{card?.comments?.length}</Button>}
          {!!card?.attachments?.length && <Button startIcon={<AttachmentIcon />} size="small">{card?.attachments?.length}</Button>}
        </CardActions>}

      </MuiCard>
    </>
  )
}

export default Card
