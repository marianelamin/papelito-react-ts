import { useNavigate } from 'react-router-dom'
import { useGame, usePlayer } from '../../../../hooks'
import { Instructions } from '../../../../ui/components'
import { Players } from '../players/players'
import EnterPapelitos from './enter-papelitos'
import { Button } from 'primereact/button'
import { useCallback } from 'react'
import { ROOM_GAME_PATH } from '../../routes'

const Lobby = () => {
  const { currentPlayer } = usePlayer()
  const { hasGameStarted } = useGame()
  const navigate = useNavigate()

  const handleGoToGame = useCallback(() => {
    navigate(ROOM_GAME_PATH)
  }, [navigate])

  return (
    <>
      {!hasGameStarted ? (
        <div>
          <h1 className="text-center">Game hasn't started yet</h1>

          {!currentPlayer?.hasSubmittedPapelitos ? (
            <>
              <Instructions />
              <EnterPapelitos />
            </>
          ) : (
            <>
              <p className="text-center">You have submitted your papelitos</p>
              <p className="text-center">Let's wait for other players to submit their papelitos.</p>
              <Players />
            </>
          )}
        </div>
      ) : (
        <div className="flex align-items-center">
          <div className="w-full text-center">
            <p>Game has already started:</p>
            <Button label="Go to Game" link onClick={handleGoToGame} />
          </div>
        </div>
      )}
    </>
  )
}

export default Lobby
