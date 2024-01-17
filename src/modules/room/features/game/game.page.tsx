import { useGame } from '../../../../hooks'
import {
  PapelitoDisplayForExplaining,
  PapelitoDisplayForGuessing
} from '../../../../ui/components/papelito-display'
import { useUser } from '../../../core/user/context'
import GameStatusSection from './game-status-section'

const GameHome = () => {
  const { player: user } = useUser()
  const { activeTurn, drawnPapelito, disputePapelito, drawPapelito, markAsGuessed } = useGame()

  return (
    <div>
      <div>
        <GameStatusSection />
      </div>
      {activeTurn.presenter.id === user?.id ? (
        <PapelitoDisplayForExplaining
          drawnPapelito={drawnPapelito}
          drawPapelito={drawPapelito}
          markAsGuessed={markAsGuessed}
        />
      ) : (
        <PapelitoDisplayForGuessing disputePapelito={disputePapelito} />
      )}
    </div>
  )
}
export default GameHome
