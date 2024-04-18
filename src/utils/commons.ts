import { TrelloColumn } from '@/interfaces/TrelloBoard'

export const capitalizeFirstLetter = (value:string) => {
  if (!value) {
    return ''
  }
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}

interface MapOrderArrayType {
  <T, U>(originalArray:T[], orderArray:U[], key: keyof T):T[];
}

export const mapOrderArray:MapOrderArrayType = (originalArray, orderArray, key) => {
  if (!originalArray||!orderArray||!key) return []
  return [...originalArray].sort((a, b) => orderArray.indexOf(a[key] as typeof orderArray[0] ) - orderArray.indexOf(b[key] as typeof orderArray[0]))
}

export const generatePlaceHolderCard = (column:TrelloColumn) => {
  column.cards.push({
    _id: column?._id + '_' + 'placeholderCard',
    boardId: column?.boardId,
    columnId: column?._id,
    attachments: [],
    comments: [],
    cover: '',
    description: '',
    memberIds: [],
    title: '',
    FE_PlaceholderCard: true
  })
}
