import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router_list from './routes'
import { RouterProvider } from 'react-router-dom'
import AppProvider from './context'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={router_list}/>
    </AppProvider>
  </StrictMode>,
)
