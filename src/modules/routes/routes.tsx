import { createBrowserRouter } from 'react-router-dom'
import LAZY_VIEWS from './lazy-views'
import { Root } from './root'
import { ROOM_PATH } from '../room/routes'

export const router = createBrowserRouter([
  { path: '/', Component: LAZY_VIEWS.HOME },
  { path: '/new/:roomId', Component: LAZY_VIEWS.HOME },
  { path: `/${ROOM_PATH}/*`, Component: LAZY_VIEWS.ROOM },
  { path: '*', Component: Root }
])
