import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout.jsx'
import Home from '../pages/Home.jsx'
import DragonBall from '../pages/DragonBall.jsx'
import DragonBallDetail from '../pages/DragonBallDetail.jsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/dragonball',
        element: <DragonBall />
      },
      {
        path: '/dragonball/:id',
        element: <DragonBallDetail />
      }
    ]
  }
])

export default router