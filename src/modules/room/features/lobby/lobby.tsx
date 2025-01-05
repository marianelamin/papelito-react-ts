import { usePlayer } from '../../../../hooks'
import { Instructions } from '../../../../ui/components'
import { Players } from '../players/players'
import EnterPapelitos from './enter-papelitos'
import { useCallback, useMemo, useState } from 'react'
import { PapButton, PapReactiveKnob } from '../../../../ui/components/common'
import { Chip } from 'primereact/chip'

const Lobby = () => {
  const { currentPlayer, allPlayers, resubmitPapelitos: handleReSubmit } = usePlayer()
  const [hasGameStarted, setHasGameStarted] = useState<boolean>(false)

  const handleStartGame = useCallback(() => {
    setHasGameStarted(true)
  }, [])

  const allSubmitted = useMemo(() => {
    const pendingSubmissions = allPlayers.filter((p) => p.hasSubmittedPapelitos === false)
    if (pendingSubmissions.length === 0) {
      return true
    } else return false
  }, [allPlayers])

  return (
    <>
      {!hasGameStarted ? (
        <div>
          <h1 className="text-center">Game hasn't started yet</h1>
          <div className="flex flex-wrap gap-2">
            {allPlayers.map((player) => (
              <Chip
                key={player.id}
                label={`${player.name}${currentPlayer?.id === player.id ? '(me)' : ''}`}
              />
            ))}
          </div>
          <PapReactiveKnob
            label="Players"
            value={allPlayers.filter((p) => p.hasSubmittedPapelitos).length}
            total={allPlayers.length}
          />
          {!currentPlayer?.hasSubmittedPapelitos ? (
            <>
              <Instructions />
              <EnterPapelitos />
            </>
          ) : (
            <>
              <p className="flex text-center align-items-center justify-content-center">
                <span>You have submitted your papelitos</span>
                <PapButton link label="Resubmit" onClick={handleReSubmit} />
              </p>
              <br />
              <p className="text-center">
                Have all players submitted? {allSubmitted ? 'yes' : 'no'}
              </p>
              <p className="text-center">Let's wait for other players to submit their papelitos.</p>
              {currentPlayer?.isAdmin ? (
                <div className="text-center py-4">
                  {/* todo: mari to start the game
                  Rules:
                   - 3 papelitos * # player are already in the bowl => enables the button
                   - Upon click, All screen should show a different view.
                  */}
                  <PapButton
                    disabled={!allSubmitted}
                    label="Start Game"
                    onClick={handleStartGame}
                  />
                </div>
              ) : null}
              <Players />
            </>
          )}
        </div>
      ) : (
        <div>
          <p>Game has started........</p>
          <div className="flex align-items-center">
            <div className="w-full text-center">
              <ol>
                <li>Update game status on the DB</li>
                <li>Set teams randomly and update the database</li>
                <li>Place timer buttons and counter</li>
                <li>Place papelito box with `?` and `actual text`</li>
                <li>Place button to draw papelito</li>
                <li>Place button to guess papelito</li>
                <li>Place button to guess papelito</li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Lobby
