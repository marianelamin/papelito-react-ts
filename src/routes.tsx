import { Route, Routes } from 'react-router'
import { ProtectedRoute } from './modules/routes/protected-route'
import Login from './modules/login/login.page'
import RoomPage from './modules/room/room.page'
import { AuthContextProvider } from './modules/core/user/context/AuthContext'

export const LOGIN_PATH = '/'
export const ROOM_PATH = 'room'
export const ROOM_SETUP_PATH = 'setup'
export const ROOM_SET_TEAMS_PATH = 'form-teams'
export const ROOM_START_GAME_PATH = 'start'
export const ROOM_ADMIN_PATH = 'admin'
export const ROOM_GAME_PATH = 'game'

export const PapelitoRoutes = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route index element={<Login />} />
        <Route path={'/new/:roomId'} element={<Login />} />

        <Route element={<ProtectedRoute redirectPath={'/'} />}>
          <Route path={`${ROOM_PATH}/*`} element={<RoomPage />} />
          <Route path={'*'} element={<RoomPage />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  )
}
