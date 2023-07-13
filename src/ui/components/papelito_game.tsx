import { useCallback, useMemo, useState } from 'react'
import { Steps } from 'primereact/steps'

import { useSelector } from 'react-redux'

import { Papelito, Player } from 'papelito-models'

import { PapelitoBowlComponent, PapelitosComponent } from 'ui/components'

import { RootState } from '+redux/store'
import { RoomState } from '+redux/feature/room/room_slice'
import { BowlState } from '+redux/feature/bowl/bowl_slice'

import { usePlayer } from 'hooks'
import { PapButton } from './common'
import { Instructions } from './game_instructions'

const viewStyle = { minHeight: '300px' }

const items = [
  {
    label: 'Instructions',
  },
  {
    label: 'Submit papelitos',
  },
  {
    label: 'Start game',
  },
]

export const PapelitoGame = () => {
  const { currentPlayer } = usePlayer()
  const playerName = useMemo(() => currentPlayer?.name, [currentPlayer])

  const [isReadyToStartGame, setIsReadyToStartGame] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [papelitoShown, setPapelitoShown] = useState<Papelito>()

  const roomState: RoomState = useSelector<RootState, RoomState>(
    (state) => state.room
  )

  const bowlState = useSelector<RootState, BowlState>((state) => state.bowl)

  const players = useSelector<RootState, Player[]>(
    (state) => state.teams.allPlayers
  )

  const guessPapelito = useCallback((papelitoGuessed: any) => {
    console.log('this papelito should be marked as guessed')
    console.log(papelitoGuessed)
  }, [])

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => prev + 1)
  }, [])

  const goToBack = useCallback(() => {
    setActiveIndex((prev) => prev - 1)
  }, [])

  const startGame = useCallback(() => {
    setActiveIndex(-1)
    setIsReadyToStartGame(true)
  }, [])

  const drawPapelito = () => {}

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <p>
          <span>Hello </span>
          <b>{playerName}</b>
        </p>
      </div>

      {!isReadyToStartGame && <Steps model={items} activeIndex={activeIndex} />}
      {activeIndex === 0 && (
        <div style={viewStyle}>
          <Instructions />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <PapButton label={'Next'} onClick={goToNext}></PapButton>
          </div>
        </div>
      )}
      {activeIndex === 1 && (
        <div style={viewStyle}>
          <PapelitosComponent />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <PapButton label={'Prev'} onClick={goToBack}></PapButton>
            <PapButton label={'Next'} onClick={goToNext}></PapButton>
          </div>
        </div>
      )}
      {activeIndex === 2 && (
        <div style={viewStyle}>
          <PapButton label={'Start'} onClick={startGame}></PapButton>
        </div>
      )}

      {isReadyToStartGame && (
        <div style={viewStyle}>
          <PapelitoBowlComponent
            currentPapelitoDisplay={papelitoShown}
            bowlMax={
              players.length *
              (roomState.room?.settings?.papelitoPerPlayer ?? 1)
            }
            bowlSize={bowlState.bowlSize}
            onDrawPapelito={drawPapelito}
            onGuessPapelito={guessPapelito}
          ></PapelitoBowlComponent>
          <h3>
            Bowl State | Not for now, but for when the game actually starts
          </h3>
          <pre>{JSON.stringify(bowlState, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
