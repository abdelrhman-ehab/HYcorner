import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import AuthContextProvider from './Context/AuthContextProvider.jsx'
import UserInfoContextProvider from './Context/UserInfoContextProvider.jsx'
import toast, { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthContextProvider>
        <UserInfoContextProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <App />
        </UserInfoContextProvider>
      </AuthContextProvider>
    </HeroUIProvider>
  </StrictMode>,
)
