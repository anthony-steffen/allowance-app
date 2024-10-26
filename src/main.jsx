import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Chakra UI imports
import { ChakraProvider } from '@chakra-ui/react'
import theme  from './shared/theme'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider resetCSS theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
