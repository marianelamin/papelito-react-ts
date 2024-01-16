import { Timeline } from 'primereact/timeline'
import { useGame } from '../../../../hooks'
import { Timer } from '../../../../ui/components'
import { PapDivider, PapReactiveKnob } from '../../../../ui/components/common'
import {
  PapelitoDisplayForExplaining,
  PapelitoDisplayForGuessing
} from '../../../../ui/components/papelito-display'
import { useUser } from '../../../core/user/context'
import { Divider } from 'primereact/divider'

const GameHome = () => {
  const { player: user } = useUser()
  const { activeRound, activeTurn, timer, bowl, drawnPapelito, drawPapelito, markAsGuessed } =
    useGame()

  return (
    <div>
      <div className="flex py-3">
        <div className="py-1">
          <Timeline
            value={[activeTurn, ...activeRound.turns]}
            content={(item) => (
              <>
                <small>Presenter:</small>
                <span>{` ${item?.presenter?.name}`}</span>
              </>
            )}
            opposite={(item, index) => (
              <>
                <small>{`${index === 0 ? '[Active] ' : ''}`}</small>
                <small>Team:</small>
                <span> {item?.team?.name}</span>
              </>
            )}
          />
        </div>
        <Divider layout="vertical" />
        <div className="w-2">
          <PapReactiveKnob
            label="Bowl"
            value={bowl.filter((p) => !p.guessed).length}
            total={bowl.length}
          />
        </div>
        <Divider layout="vertical" />
        <div className="w-2">
          <Timer />
        </div>
        <Divider layout="vertical" />
        <div className="w-2"></div>
      </div>

      {activeTurn.presenter.id === user?.id ? (
        <div>
          <PapelitoDisplayForExplaining
            drawnPapelito={drawnPapelito}
            drawPapelito={drawPapelito}
            markAsGuessed={markAsGuessed}
          />
        </div>
      ) : (
        <div>
          <PapelitoDisplayForGuessing />
        </div>
      )}
    </div>
  )
}
export default GameHome
