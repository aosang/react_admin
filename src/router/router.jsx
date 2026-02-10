import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout'

import Table from '@/pages/Table/Table'
import Card from '@/pages/Card/Card'
import Menu from '@/pages/Menu/Menu'
import Carousel from '@/pages/Carousel/Carousel'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Table />  // 默认显示 Table 页面
      },
      {
        path: 'Card',
        element: <Card />
      },
      {
        path: 'Table',
        element: <Table />
      },
      {
        path: 'Menu',
        element: <Menu />
      }, 
      {
        path: 'Carousel',
        element: <Carousel />
      }
    ]
  }
])

export default router
