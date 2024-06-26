import Box from '@mui/material/Box'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import Card from './Card/Card'
import { TrelloCard } from '@/interfaces/TrelloBoard'

interface ListCardsTypes {
  cards: TrelloCard[]
}
function ListCards({ cards }: ListCardsTypes) {
  return (
    <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy} >
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
      ${theme.trello.columnHeaderHeight} -
      ${theme.trello.columnFooterHeight}
      )`,
          '&::-webkit-scrollbar-thumb': {
            background: '#ced0da'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#bfc2cf'
          }
        }}
      >
        {cards && cards?.map((card: TrelloCard) => (<Card key={card?._id} card={card} />))}
      </Box>
    </SortableContext>
  )
}

export default ListCards
