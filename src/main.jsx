import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "toastr/build/toastr.min.css";
import { HeroUIProvider } from '@heroui/react'
import AuthContextProvider from './Context/AuthContextProvider.jsx'
import UserInfoContextProvider from './Context/userInfoContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthContextProvider>
        <UserInfoContextProvider>
          <App />
        </UserInfoContextProvider>
      </AuthContextProvider>
    </HeroUIProvider>
  </StrictMode>,
)
