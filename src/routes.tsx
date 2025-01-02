import { createBrowserRouter } from 'react-router-dom'
import { Root } from './modules/routes/root'
import { ProtectedRoute } from './modules/routes/guarded_route'
import { attemptToGetPlayerAndRoomDetails } from './modules/core/auth-helper'
import { lazy } from 'react'

export const ROOM_PATH = 'room'
export const ROOM_SETUP_PATH = 'setup'
export const ROOM_SET_TEAMS_PATH = 'form-teams'
export const ROOM_START_GAME_PATH = 'start'
export const ROOM_ADMIN_PATH = 'admin'
export const ROOM_GAME_PATH = 'game'

const LAZY_VIEWS = {
  HOME: lazy(async () => await import('./modules/login/login.page')),
  ROOM: lazy(async () => await import('./modules/room/room.page')),
  LOADING: lazy(async () => await import('./modules/shared/loading/loading'))
}

const routes = [
  { path: '/', Component: LAZY_VIEWS.HOME },
  { path: '/new/:roomId', Component: LAZY_VIEWS.HOME },
  {
    path: ROOM_PATH,
    loader: async () => {
      return await attemptToGetPlayerAndRoomDetails()
    },
    children: [
      {
        path: '',
        Component: () => (
          <ProtectedRoute redirectPath={'/'}>
            <LAZY_VIEWS.ROOM />
          </ProtectedRoute>
        )
      },
      { path: '*', element: <h1>Page does not exist</h1> }
    ]
  },
  { path: '*', Component: Root }
]

export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_skipActionErrorRevalidation: true
  }
})
