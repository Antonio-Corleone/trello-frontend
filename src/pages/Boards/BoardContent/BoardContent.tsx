import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  // PointerSensor,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import ListColumns from './ListColumns/ListColumns'
import TrelloBoard, { TrelloColumn } from '@/interfaces/TrelloBoard'
import { mapOrderArray } from '@/utils/commons'

interface BoardContentTypes {
  board: TrelloBoard
}
function BoardContent({ board }: BoardContentTypes) {

  const [orderedColumns, setOrderedColumns] = useState<TrelloColumn[]>([])

  useEffect(() => {
    setOrderedColumns(mapOrderArray(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // const pointerSensor = useSensor(
  //   PointerSensor,
  //   // Require the mouse to move by 10 pixels before activating
  //   { activationConstraint: { distance: 10 } }
  // )
  const mouseSensor = useSensor(
    MouseSensor,
    // Require the mouse to move by 10 pixels before activating
    { activationConstraint: { distance: 10 } }
  )
  const touchSensor = useSensor(
    TouchSensor,
    // Press delay of 250ms, with tolerance of 500px of movement
    {
      activationConstraint: {
        delay: 250,
        tolerance: 500
      }
    }
  )
  const mySensors = useSensors(
    // pointerSensor,
    mouseSensor,
    touchSensor
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      const newOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // const newColumnOrderIds = newOrderedColumns?.map(c => c._id)
      setOrderedColumns(newOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={mySensors}>
      <Box sx={{
        width: '100%',
        display: 'flex',
        height: (theme) => theme.trello.boardContentHeigh,
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        padding: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
      </Box >
    </DndContext>
  )
}

export default BoardContent
