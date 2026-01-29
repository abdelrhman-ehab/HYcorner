import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HeroUIProvider } from '@heroui/react'
import AuthContextProvider from './Context/AuthContextProvider.jsx'
import { Toaster } from 'react-hot-toast';
import { queryClient } from './lib/queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {QueryClientProvider} from '@tanstack/react-query'
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <AuthContextProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <App />
          <ReactQueryDevtools />
        </AuthContextProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  </StrictMode>,
)