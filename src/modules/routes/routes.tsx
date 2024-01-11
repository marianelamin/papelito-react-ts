import { createBrowserRouter } from 'react-router-dom'
import LAZY_VIEWS from './lazy-views'
import { Root } from './root'
import { ROOM_PATH } from '../room/routes'
import { ProtectedRoute } from './guarded_route'
import { attemptToGetPlayerAndRoomDetails } from '../core/auth-helper'

export const router = createBrowserRouter([
  { path: '/', Component: LAZY_VIEWS.HOME },
  { path: '/new/:roomId', Component: LAZY_VIEWS.HOME },
  {
    path: `/${ROOM_PATH}/*`,
    loader: async () => {
      return await attemptToGetPlayerAndRoomDetails()
    },
    Component: () => (
      <ProtectedRoute defaultPath={'/'}>
        <LAZY_VIEWS.ROOM />
      </ProtectedRoute>
    )
  },
  { path: '*', Component: Root }
])
