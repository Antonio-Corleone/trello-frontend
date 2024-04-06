import { TrelloColumn, TrelloCard } from '@/interfaces/TrelloBoard'

export const capitalizeFirstLetter = (value:string) => {
  if (!value) {
    return ''
  }
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`
}

type KeyType = TrelloColumn | TrelloCard
export const mapOrderArray = <K extends keyof KeyType>(originalArray:TrelloColumn[] | TrelloCard[], orderArray:string[], key: K) => {
  if (!originalArray||!orderArray||!key) return []
  return [...originalArray].sort((a, b) => orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]))
}
