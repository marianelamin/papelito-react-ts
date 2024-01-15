import { useGame } from '../../../../hooks'
import { Timer } from '../../../../ui/components'
import { PapDivider, PapReactiveKnob } from '../../../../ui/components/common'
import {
  PapelitoDisplayForExplaining,
  PapelitoDisplayForGuessing
} from '../../../../ui/components/papelito-display'
import { useUser } from '../../../../utilities/context'

const GameHome = () => {
  const { player: user } = useUser()
  const { activeRound, activeTurn, timer, bowl, drawnPapelito, drawPapelito, markAsGuessed } =
    useGame()

  return (
    <div>
      <div>
        <Timer />
        <p>Team's turn: {activeTurn.team.name}</p>
        <p>Player's turn: {activeTurn.presenter.name}</p>

        <PapReactiveKnob
          label="Bowl"
          value={bowl.filter((p) => !p.guessed).length}
          total={bowl.length}
        />
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

      <PapDivider text={''} layout="horizontal" />
      <pre> activeRound: {JSON.stringify(activeRound, null, 2)} </pre>
      <pre> activeTurn: {JSON.stringify(activeTurn, null, 2)} </pre>
      <pre> Timer: {JSON.stringify(timer, null, 2)} </pre>
      <PapDivider text={''} layout="horizontal" />

      <p>What do I want to see?</p>
      <ul>
        <li>Whos turn is it?</li>
        <ul>
          <li>previous, current, next</li>
        </ul>
        <li>button to start/pause/reset timer</li>
        <li>What is the score for each team?</li>
        <li>As presenter</li>
        <ul>
          <li>Area with text to describe</li>
          <li>prevent keyboard from copying, screenshotting</li>
        </ul>
        <li>As guesser</li>
        <ul>
          <li>Area with a question mark</li>
          <li>buttons to dispute</li>
        </ul>
      </ul>
      <p>Note to self: Need to</p>
      <ul>
        <li>new collection: rounds</li>
        <ul>
          <li>winner team</li>
          <li>final scores</li>
        </ul>
        <li>collection: turns</li>
        <ul>
          <li>team presenting</li>
          <li>player id speaking/acting</li>
          <li>paper(s) guessed</li>
          <li>timer count</li>
        </ul>
        <li>collection: clock</li>
        <ul>
          <li>status</li>
        </ul>
      </ul>
    </div>
  )
}
export default GameHome
