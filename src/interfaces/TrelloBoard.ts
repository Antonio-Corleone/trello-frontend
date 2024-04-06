export interface TrelloCard {
  _id: string;
  boardId: string;
  columnId:string;
  title: string;
  description:string|null;
  cover:string|null;
  memberIds: string[];
  comments: string[];
  attachments: string[]
}

export interface TrelloColumn {
  _id: string;
  boardId: string;
  title: string;
  cardOrderIds: string[];
  cards: TrelloCard[];
}

export default interface TrelloBoard {
  _id: string;
  title: string;
  description:string;
  type:BoardTypes;
  ownerIds:string[];
  memberIds:string[];
  columnOrderIds:string[];
  columns: TrelloColumn[]
}
type BoardTypes= 'public'|'private'
