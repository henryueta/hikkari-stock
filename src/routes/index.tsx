import Home from './home'
import { createBrowserRouter } from 'react-router-dom'
import Auth from './auth'
import Private from './private'

const router_list = createBrowserRouter([
  {
    path:"/",
    element:
    <Private>
      <Home/>
    </Private>
  },
  {
    path:"/Auth",
    element:<Auth/>
  }
])

export default router_list