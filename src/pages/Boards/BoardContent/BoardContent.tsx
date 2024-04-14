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
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'

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
  const findColumnByCardId = (cardId: UniqueIdentifier) => {
    return orderedColumns.find(col => col.cards?.map(card => card._id)?.includes(cardId as string))
  }
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

  const handleDragOver = (event: DragEndEvent) => {
    // If drag item is column do nothing
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE['column']) return
    const { active, over } = event
    if (!active || !over) return
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId, data: { current: overColumnData } } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    // if overColumn has an empty cards findColumnByCardId(overCardId) will return undefined
    // In this case overColumn is overColumnData
    const overColumn = findColumnByCardId(overCardId) ?? overColumnData
    if (!activeColumn || !overColumn) return
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        const overCardIndex = overColumn?.cards?.findIndex((card: TrelloCard) => card._id === overCardId)
        let newCardIndex: number = -1
        const isBelowOverItem = over && active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)
        if (nextActiveColumn) {
          // remove active card id from active column
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
          //  update cardOrderIds for active column
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }
        if (nextOverColumn) {
          // check if active card id has existed in over column yet, if it has existed remove
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // update active card to the new index of over column
          nextOverColumn.cards.splice(newCardIndex, 0, activeDraggingCardData as TrelloCard)
          // update cardOrderIds for active column
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }
        return nextColumns
      })
    } else {
      const oldCardIndex = activeColumn.cardOrderIds.findIndex(c => c === activeDraggingCardId)
      const newCardIndex = activeColumn.cardOrderIds.findIndex(c => c === overCardId)
      const newOrderedCardIds = arrayMove(activeColumn.cardOrderIds, oldCardIndex, newCardIndex)
      const updateColumnActive = {
        ...activeColumn,
        cardOrderIds: newOrderedCardIds
      }
      const newOrderedColumns = orderedColumns.map(col => {
        if (col._id === updateColumnActive._id) {
          return updateColumnActive
        } else {
          return col
        }
      })
      setOrderedColumns(newOrderedColumns)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    // If drag item is card do nothing
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE['card']) return
    const { active, over } = event
    if (!active || !over) return
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
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={mySensors}
      collisionDetection={closestCorners}
    >
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
