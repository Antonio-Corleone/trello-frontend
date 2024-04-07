import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import TrelloBoard from '@/interfaces/TrelloBoard'
import { mapOrderArray } from '@/utils/commons'

interface BoardContentTypes {
  board: TrelloBoard
}
function BoardContent({ board }: BoardContentTypes) {
  const orderedColumns = mapOrderArray(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      height: (theme) => theme.trello.boardContentHeigh,
      bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
      padding: '10px 0'
    }}>
      <ListColumns columns={orderedColumns} />
    </Box >
  )
}

export default BoardContent
