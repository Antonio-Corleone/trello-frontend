import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

import Column from './Column/Column'
import { TrelloColumn } from '@/interfaces/TrelloBoard'

interface ListColumnsTypes {
  columns: TrelloColumn[]
}

function ListColumns({ columns }: ListColumnsTypes) {
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy} >
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* List Columns */}
        {columns && columns?.map((column: TrelloColumn) => (<Column key={column?._id} column={column} />))}
        {/* Add new column */}
        <Box
          sx={{
            width: '200px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}>
          <Button
            sx={{
              color: 'white',
              width: '100%',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: 1
            }}
            startIcon={<NoteAddIcon />}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
