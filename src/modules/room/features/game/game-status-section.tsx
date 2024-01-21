import { Timeline } from 'primereact/timeline'
import { useGame } from '../../../../hooks'
import { Timer } from '../../../../ui/components'
import { PapReactiveKnob } from '../../../../ui/components/common'
import { Divider } from 'primereact/divider'
import { useBowl } from './hook'

const GameStatusSection = () => {
  const { activeRound, activeTurn } = useGame()
  const { bowl } = useBowl()

  return (
    <div className="flex flex-wrap py-3">
      <div className="py-1 flex flex-1">
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
      <div className="w-2 flex flex-1 align-items-center justify-content-center">
        <PapReactiveKnob
          label="Bowl"
          value={bowl.filter((p) => !p.guessed).length}
          total={bowl.length}
        />
      </div>
      <Divider layout="vertical" />
      <div className="w-2 pr-3 flex flex-auto justify-content-end">
        <Timer />
      </div>
    </div>
  )
}

export default GameStatusSection
