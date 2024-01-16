import React from 'react'

import { Header } from '../shared/header'
import { UserContextProvider, useUser } from '../core/user/context'
import Footer from '../shared/footer'
import RoomLayout from './layout/room.layout'
import { Navigate, Route, Routes } from 'react-router'
import Lobby from './features/lobby/lobby'
import { ROOM_SETUP_PATH, ROOM_ADMIN_PATH, ROOM_PATH, ROOM_GAME_PATH } from './routes'
import RoomSetupWizardPage from './features/room-setup-wizard/room-setup-wizard.page'
import AdminHome from './features/admin/admin.page'
import { RoomSetupWizardContextProvider } from './features/room-setup-wizard/data-access/context/room-setup-wizard.context'
import GameHome from './features/game/game.page'
import { useFlags } from '../core/flags/hook'

const RoomPage: React.FC = () => {
  return (
    <UserContextProvider>
      <RoomLayout>
        <Header />

        <RoomContainer />

        <Footer />
      </RoomLayout>
    </UserContextProvider>
  )
}

const RoomContainer = (): JSX.Element => {
  const { player } = useUser()
  const { enableAdminRoute, enableRoomSetupRoute } = useFlags()
  return (
    <Routes>
      <Route index={true} Component={Lobby} />
      {player?.isAdmin ? (
        <>
          {enableRoomSetupRoute ? (
            <>
              <Route
                path={`${ROOM_SETUP_PATH}/:step`}
                Component={() => (
                  <RoomSetupWizardContextProvider>
                    <RoomSetupWizardPage />
                  </RoomSetupWizardContextProvider>
                )}
              />
              <Route
                path={`${ROOM_SETUP_PATH}/*`}
                Component={() => (
                  <RoomSetupWizardContextProvider>
                    <RoomSetupWizardPage />
                  </RoomSetupWizardContextProvider>
                )}
              />
            </>
          ) : null}
          {enableAdminRoute ? <Route path={`${ROOM_ADMIN_PATH}/*`} Component={AdminHome} /> : null}
        </>
      ) : null}
      <Route path={`${ROOM_GAME_PATH}/*`} Component={GameHome} />
      <Route path={'*'} Component={() => <Navigate to={`/${ROOM_PATH}`} replace />} />
    </Routes>
  )
}

export default RoomPage
