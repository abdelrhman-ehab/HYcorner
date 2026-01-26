import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import AuthContextProvider from './Context/AuthContextProvider.jsx'
import UserInfoContextProvider from './Context/UserInfoContextProvider.jsx'
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthContextProvider>
        <UserInfoContextProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools/>
            <App />
          </QueryClientProvider>
        </UserInfoContextProvider>
      </AuthContextProvider>
    </HeroUIProvider>
  </StrictMode>,
)
