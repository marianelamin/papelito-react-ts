import { useNavigate } from 'react-router'
import { PapButton } from '../../../ui/components/common'
import { useCallback } from 'react'
import { ROOM_PATH, ROOM_SETUP_PATH } from './room.routes'
import { Players } from '../players/players'
import { Header } from '../../../ui/views/header'
import { UserContextProvider } from '../../../utilities/context'
import Footer from '../../../ui/views/footer'
import EnterPapelitos from '../../../ui/views/enter-papelitos'

const Lobby = () => {
  return (
    <UserContextProvider>
      <Header />
      <div>
        <h1>Welcome to the room</h1>
        <p>
          Game has not started. Please add your papelitos in the mean time. See basic room settings
        </p>
        <Players />
        <EnterPapelitos />
      </div>
      <Footer />
    </UserContextProvider>
  )
}

export default Lobby
