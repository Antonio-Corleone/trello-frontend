import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import TrelloBoard, { TrelloCard, TrelloColumn } from '@/interfaces/TrelloBoard'
import { mapOrderArray } from '@/utils/commons'

import ListColumns from './ListColumns/ListColumns'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

interface BoardContentTypes {
  board: TrelloBoard
}
enum ACTIVE_DRAG_ITEM_TYPE {
  'card' = 'ACTIVE_DRAG_ITEM_TYPE_CARD',
  'column' = 'ACTIVE_DRAG_ITEM_TYPE_COLUMN'
}
function BoardContent({ board }: BoardContentTypes) {

  const [orderedColumns, setOrderedColumns] = useState<TrelloColumn[]>([])
  // handle drag and drop item (card or column)
  const [activeDragItemId, setActiveDragItemId] = useState<UniqueIdentifier | null>(null)
  const [activeDragItemType, setActiveDragItemType] = useState<string | null>(null)
  const [activeDragItemData, setActiveDragItemData] = useState<TrelloColumn | TrelloCard | null>(null)

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
  const handleDragStart = (event: DragEndEvent) => {
    let itemData = null
    const itemId = event?.active?.id
    const itemType = event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE['card'] : ACTIVE_DRAG_ITEM_TYPE['column']
    if (itemType === 'ACTIVE_DRAG_ITEM_TYPE_CARD') {
      itemData = event?.active?.data?.current as TrelloCard
    } else {
      itemData = event?.active?.data?.current as TrelloColumn
    }
    setActiveDragItemId(itemId)
    setActiveDragItemType(itemType)
    setActiveDragItemData(itemData)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
      const newIndex = orderedColumns.findIndex(c => c._id === over.id)
      const newOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      setOrderedColumns(newOrderedColumns)
    }
    // Reset state after end drag item
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }
  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={mySensors}>
      <Box sx={{
        width: '100%',
        display: 'flex',
        height: (theme) => theme.trello.boardContentHeigh,
        bgcolor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        padding: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE['column']) && <Column column={activeDragItemData as TrelloColumn} />}
          {(activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE['card']) && <Card card={activeDragItemData as TrelloCard} />}
        </DragOverlay>
      </Box >
    </DndContext>
  )
}

export default BoardContent
