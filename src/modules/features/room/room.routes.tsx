import LAZY_VIEWS from '../../routes/lazy-views'
import Lobby from './lobby'
import RoomSetup from '../../../ui/views/room-setup'
import EnterPapelitos from '../../../ui/views/enter-papelitos'
import SetTeams from '../../../ui/views/set-teams'
import StartGame from '../../../ui/views/start-game'
import { RouteObject } from 'react-router'

export const ROOM_PATH = 'room'
export const ROOM_SETUP_PATH = 'room-setup'
export const ROOM_ENTER_PAPELITOS_PATH = 'enter-papelitos'
export const ROOM_SET_TEAMS_PATH = 'set-teams'
export const ROOM_START_GAME_PATH = 'start-game'
export const ROOM_ADMIN_PATH = 'admin'

export const ROOM_ROUTES: RouteObject = {
  path: `/${ROOM_PATH}/*`,
  children: [
    { index: true, Component: Lobby },
    { path: ROOM_SETUP_PATH, Component: RoomSetup },
    { path: ROOM_ENTER_PAPELITOS_PATH, Component: EnterPapelitos },
    { path: ROOM_SET_TEAMS_PATH, Component: SetTeams },
    { path: ROOM_START_GAME_PATH, Component: StartGame },
    {
      path: `${ROOM_ADMIN_PATH}/*`,
      Component: LAZY_VIEWS.ADMIN
    },
    { path: '*', Component: LAZY_VIEWS.ROOM }
  ]
}
