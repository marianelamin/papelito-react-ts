import { Instructions } from '../../../../ui/components'
import EnterPapelitos from '../room-setup-wizard/setup/enter-papelitos'

const Lobby = () => {
  return (
    <div>
      <h1>Welcome to the room</h1>
      <p>
        Game has not started. Please add your papelitos in the mean time. See basic room settings
      </p>
      <Instructions />
      <EnterPapelitos />
    </div>
  )
}

export default Lobby
