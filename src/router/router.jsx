import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout'

import Home from '@/pages/Home/Home'
import User from '@/pages/User/User'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />  // 默认显示 Home 页面
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'user',
        element: <User />
      }
    ]
  }
])

export default router
