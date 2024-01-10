import React from 'react'

import { Header } from '../shared/header'
import { UserContextProvider } from '../../utilities/context'
import Footer from '../shared/footer'
import RoomLayout from './layout/room.layout'
import { Route, Routes } from 'react-router'
import LAZY_VIEWS from '../routes/lazy-views'
import RoomSetup from './features/room-setup-wizard/setup/room-setup'
import ArrangeTeams from './features/room-setup-wizard/setup/arrange-teams'
import StartGame from './features/room-setup-wizard/setup/start-game'
import Lobby from './features/lobby/lobby'
import { RoomSetupWizardContextProvider } from './features/room-setup-wizard/data-access/context/room-setup-wizard.context'
import {
  ROOM_SETUP_PATH,
  ROOM_SET_TEAMS_PATH,
  ROOM_START_GAME_PATH,
  ROOM_ADMIN_PATH
} from './routes'
import { Players } from './features/players/players'

const RoomPage: React.FC = () => {
  return (
    <UserContextProvider>
      <RoomLayout>
        <Header />

        <RoomSetupWizardContextProvider>
          <Routes>
            <Route index={true} Component={Lobby} />
            <Route path={ROOM_SETUP_PATH} Component={RoomSetup} />
            <Route path={ROOM_SET_TEAMS_PATH} Component={ArrangeTeams} />
            <Route path={ROOM_START_GAME_PATH} Component={StartGame} />
            <Route path={`${ROOM_ADMIN_PATH}/*`} Component={LAZY_VIEWS.ADMIN} />
            <Route path={'*'} Component={LAZY_VIEWS.ROOM} />
          </Routes>
        </RoomSetupWizardContextProvider>
        <Players />

        <Footer />
      </RoomLayout>
    </UserContextProvider>
  )
}

export default RoomPage
