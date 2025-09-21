import App from '../App'
import { createBrowserRouter } from 'react-router-dom'
import Auth from './auth'

const router_list = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:"/Auth",
    element:<Auth/>
  }
])

export default router_list