import { useState, useEffect, useCallback, useRef } from 'react'
import Box from '@mui/material/Box'
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects,
  closestCorners,
  Over,
  Active,
  CollisionDetection,
  pointerWithin,
  getFirstCollision
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
  const [originalColumn, setOriginalColumn] = useState<TrelloColumn | null>(null)

  const lastOverId = useRef<UniqueIdentifier | null>(null)

  useEffect(() => {
    setOrderedColumns(mapOrderArray(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

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
    mouseSensor,
    touchSensor
  )
  const findColumnByCardId = (cardId: UniqueIdentifier) => {
    return orderedColumns.find(col => col.cards?.map(card => card._id)?.includes(cardId as string)) ?? null
  }
  interface MoveCardBetweenColumn {
    overColumn: TrelloColumn;
    overCardId: UniqueIdentifier;
    over: Over | null;
    active: Active;
    activeColumn: TrelloColumn;
    activeDraggingCardId: UniqueIdentifier;
  }
  const handleMoveCardBetweenColumns = ({
    overColumn,
    overCardId,
    over,
    active,
    activeColumn,
    activeDraggingCardId
  }: MoveCardBetweenColumn) => {
    const { data: { current: activeDraggingCardData } } = active
    setOrderedColumns(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex((card: TrelloCard) => card._id === overCardId)
      let newCardIndex: number = -1
      const isBelowOverItem = over && active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      // remove active card id from active column
      nextActiveColumn!.cards = nextActiveColumn!.cards.filter(card => card._id !== activeDraggingCardId)
      //  update cardOrderIds for active column
      nextActiveColumn!.cardOrderIds = nextActiveColumn!.cards.map(card => card._id)

      // check if active card id has existed in over column yet, if it has existed remove
      nextOverColumn!.cards = nextOverColumn!.cards.filter(card => card._id !== activeDraggingCardId)
      // update active card to the new index of over column
      nextOverColumn!.cards.splice(newCardIndex, 0, {
        ...activeDraggingCardData,
        columnId: overColumn._id
      } as TrelloCard)
      // update cardOrderIds for active column
      nextOverColumn!.cardOrderIds = nextOverColumn!.cards.map(card => card._id)

      return nextColumns
    })
  }
  const handleDragStart = (event: DragEndEvent) => {
    let itemData = null
    const itemId = event?.active?.id
    const itemType = event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE['card'] : ACTIVE_DRAG_ITEM_TYPE['column']
    if (itemType === 'ACTIVE_DRAG_ITEM_TYPE_CARD') {
      itemData = event?.active?.data?.current as TrelloCard
      setOriginalColumn(findColumnByCardId(itemId))
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
    const { id: activeDraggingCardId } = active
    const { id: overCardId } = over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return
    if (activeColumn._id !== overColumn._id) {
      handleMoveCardBetweenColumns({
        active,
        activeColumn,
        activeDraggingCardId,
        over,
        overColumn,
        overCardId
      })
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!active || !over) return
    // DnD Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE['card']) {
      const { id: activeDraggingCardId } = active
      const { id: overCardId } = over
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return
      if (originalColumn?._id !== overColumn._id) {
        // DnD card between different columns
        handleMoveCardBetweenColumns({
          active,
          activeColumn,
          activeDraggingCardId,
          over,
          overColumn,
          overCardId
        })
      }
      else {
        // Dnd card inside column
        const oldCardIndex = activeColumn.cards.findIndex(c => c._id === activeDraggingCardId)
        const newCardIndex = activeColumn.cards.findIndex(c => c._id === overCardId)
        const newOrderedCards = arrayMove(activeColumn.cards, oldCardIndex, newCardIndex)
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetedColumn = nextColumns.find(column => column._id === overColumn._id) as TrelloColumn
          // update cards
          targetedColumn.cards = newOrderedCards
          // update cardOrderIds
          targetedColumn.cardOrderIds = newOrderedCards.map(card => card._id)
          return nextColumns
        })
      }
    }
    // DnD Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE['column']) {
      if (active.id !== over.id) {
        const oldIndex = orderedColumns.findIndex(c => c._id === active.id)
        const newIndex = orderedColumns.findIndex(c => c._id === over.id)
        const newOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
        // Update columns and columnOrderIds for board save to BE
        // console.log('board', board)
        // console.log('newOrderedColumns', newOrderedColumns)
        setOrderedColumns(newOrderedColumns)
      }
    }
    // Reset state after end drag item
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOriginalColumn(null)
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
  const collisionDetectionStrategy: CollisionDetection = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE['column']) {
      return closestCorners({ ...args })
    }
    // Start by finding any intersecting droppable
    const pointerIntersections = pointerWithin(args)
    if (!pointerIntersections?.length) return []
    let overId = getFirstCollision(pointerIntersections, 'id')
    if (overId != null) {
      const checkColumn = orderedColumns.find(col => col._id === overId)
      if (checkColumn) {
        // if droppableContainers is column (overId === columnId) find the closest card in this column, and update overId equal cardId of that closest card
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => container.id !== overId && checkColumn?.cardOrderIds?.includes(container.id as string))
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }
    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={mySensors}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
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
