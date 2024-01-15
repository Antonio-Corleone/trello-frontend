import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import {
  useColorScheme
} from '@mui/material/styles'
import { Button } from '@mui/material'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}

function App() {
  return (
    <>
      <ModeToggle />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Material UI Vite.js example in TypeScript
          </Typography>
          <Typography color='text.secondary'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquam delectus ab magni nam nulla debitis sed aliquid recusandae repellendus necessitatibus doloribus, consequuntur molestias fuga ipsa incidunt doloremque molestiae dignissimos!</Typography>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}

export default App
