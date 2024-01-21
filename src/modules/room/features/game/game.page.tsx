import { useGame } from '../../../../hooks'
import {
  PapelitoDisplayForExplaining,
  PapelitoDisplayForGuessing
} from '../../../../ui/components/papelito-display'
import { useUser } from '../../../core/user/context'
import GameStatusSection from './game-status-section'

const GameHome = () => {
  const { player: user } = useUser()
  const { activeTurn } = useGame()

  return (
    <div>
      <div>
        <GameStatusSection />
      </div>
      {activeTurn.presenter.id === user?.id ? (
        <PapelitoDisplayForExplaining />
      ) : (
        <PapelitoDisplayForGuessing />
      )}
    </div>
  )
}
export default GameHome
