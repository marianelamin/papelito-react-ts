import { createBrowserRouter } from 'react-router-dom'
import LAZY_VIEWS from './lazy-views'
import { Root } from './root'
import { ROOM_ROUTES } from '../features/room/room.routes'

export const router = createBrowserRouter([
  { path: '/', Component: LAZY_VIEWS.HOME },
  { path: '/new/:roomId', Component: LAZY_VIEWS.HOME },
  ROOM_ROUTES,
  { path: '*', Component: Root }
])
