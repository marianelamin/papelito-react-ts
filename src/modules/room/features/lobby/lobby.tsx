import { usePlayer } from '../../../../hooks'
import { Instructions } from '../../../../ui/components'
import { Players } from '../players/players'
import EnterPapelitos from './enter-papelitos'

const Lobby = () => {
  const { currentPlayer } = usePlayer()
  return (
    <div>
      <h1>Welcome to the room</h1>
      {!currentPlayer?.hasSubmittedPapelitos ? (
        <>
          <p>
            Game has not started. Please add your papelitos in the mean time. See basic room
            settings
          </p>
          <Instructions />
          <EnterPapelitos />
        </>
      ) : (
        <>
          <p>You have submitted your papelitos</p>
          <Players />
        </>
      )}
    </div>
  )
}

export default Lobby
