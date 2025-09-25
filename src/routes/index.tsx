import HomePage from './home'
import { createBrowserRouter } from 'react-router-dom'
import Auth from './auth'
import Private from './private'
import TableFormPage from './table-form'

const router_list = createBrowserRouter([
  {
    path:"/",
    element:
    <Private>
      <HomePage/>
    </Private>
  },
  {
    path:"/auth",
    element:<Auth/>
  },
  {
    path:"/:table/:type",
    element:<TableFormPage/>
  }
])

export default router_list