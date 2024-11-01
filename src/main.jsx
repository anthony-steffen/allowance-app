import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Chakra UI imports
import { ChakraProvider } from '@chakra-ui/react'
import theme  from './shared/theme'
import ToggleButtonTheme from "./components/ToggleButtonTheme"

//Context imports
import AuthProvider from './context/authProvider.jsx'
import TaskProvider from './context/taskProvider.jsx'

// Pages Imports
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'

//Router-Dom imports
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <TaskProvider>
          <ToggleButtonTheme />
          <Router>
            <Routes>
              <Route path='/' element={ <App/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/admin' element={<AdminDashboard/>}/>
            </Routes>
          </Router>
        </TaskProvider>
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
)
