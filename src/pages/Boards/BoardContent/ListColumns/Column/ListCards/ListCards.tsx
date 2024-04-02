import Box from '@mui/material/Box'
import Card from './Card/Card'

function ListCards() {
  return (
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
      <Card showCardMedia cardTitle='TRELLO MERN STACK' />
      <Card cardTitle='Trello'/>
      <Card cardTitle='Learn NodeJS'/>
      <Card cardTitle='Review ReactJS'/>
      <Card cardTitle='Practice algorithm & data structure'/>
    </Box>
  )
}

export default ListCards