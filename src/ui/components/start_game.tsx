import { useCallback, useMemo } from 'react'
import { PapButton } from './common'
import { usePlayer } from 'hooks'

export const StartGame = () => {
  const { currentPlayer } = usePlayer()

  const hasSubmittedPapelitos = useMemo(
    () => currentPlayer?.hasSubmittedPapelitos,
    [currentPlayer?.hasSubmittedPapelitos]
  )

  const goToStartGame = useCallback(() => {
    // todo: Make a call to api to say we started the game
    console.log('Make a call to api to say we started the game')
  }, [])

  return (
    <div className={'col-12'}>
      <div>
        <h3 className="text-center m-0">Start Game</h3>
      </div>
      <div className="grid gap-3 p-3">
        <div>
          <h4>Game settings</h4>
          <div className="grid gap-3">
            <div className="col">
              <p># rondas</p>
              <p># total papelitos en bowl</p>
              <p># segundos por turno</p>
            </div>
          </div>
        </div>
        <div>
          <h4>Equipos</h4>
          <div className="grid gap-3">
            <div className="col">
              <p>Team A</p>
              <p>Player 1</p>
              <p>Player 2</p>
            </div>
            <div className="col">
              <p>Team B</p>
              <p>Player 1</p>
              <p>Player 2</p>
            </div>
            <div className="col">
              <p>Team C</p>
              <p>Player 1</p>
              <p>Player 2</p>
            </div>
            <div className="col">
              <p>Team D</p>
              <p>Player 1</p>
              <p>Player 2</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid">
        <PapButton
          disabled
          className="col-offset-3 col-6"
          icon={<i className="pi pi-play" />}
          severity={'success'}
          label="Comenzar"
          onClick={goToStartGame}
        />
      </div>
    </div>
  )
}
