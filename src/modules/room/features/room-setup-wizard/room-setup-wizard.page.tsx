import { Route, Routes } from 'react-router'

import { ROOM_SET_TEAMS_PATH, ROOM_START_GAME_PATH } from '../../routes'
import RoomSetup from './setup/room-setup'
import ArrangeTeams from './setup/arrange-teams'
import StartGame from './setup/start-game'
// import { RoomSetupWizardContextProvider } from './data-access/context/room-setup-wizard.context'
import { useUser } from '../../../../utilities/context'

const RoomSetupWizardPage = (): JSX.Element => {
  const { player } = useUser()

  console.log({ is: player?.isAdmin })
  return (
    // <RoomSetupWizardContextProvider>
    <Routes>
      {player?.isAdmin} && <Route index={true} Component={RoomSetup} />
      {player?.isAdmin} && <Route path={ROOM_SET_TEAMS_PATH} Component={ArrangeTeams} />
      {player?.isAdmin} && <Route path={ROOM_START_GAME_PATH} Component={StartGame} />
    </Routes>
    // </RoomSetupWizardContextProvider>
  )
}

export default RoomSetupWizardPage
