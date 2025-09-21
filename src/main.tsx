import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router_list from './routes'
import { RouterProvider } from 'react-router-dom'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router_list}/>
  </StrictMode>,
)
