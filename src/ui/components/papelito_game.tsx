import { useMemo, useState } from 'react'
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

  const bowlState = useSelector<RootState, BowlState>((state) => {
    return state.bowl
  })

  const players = useSelector<RootState, Player[]>((state) => {
    return state.teams.allPlayers
  })

  const guessPapelito = (papelitoGuessed: any) => {
    console.log('this papelito should be marked as guessed')
    console.log(papelitoGuessed)
  }

  const drawPapelito = () => {}

  const deletePlayer = (player: Player) => console.log(`delete: ${player}`)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <p>
          <span>Hello </span>
          <b>{playerName}</b>
        </p>
      </div>

      {!isReadyToStartGame && (
        <div className="card">
          <Steps model={items} activeIndex={activeIndex} />
        </div>
      )}

      {activeIndex === 0 && (
        <div style={viewStyle}>
          <Instructions />
          <PapButton
            label={'Next'}
            onClick={() => setActiveIndex(1)}
          ></PapButton>
        </div>
      )}
      {activeIndex === 1 && (
        <div style={viewStyle}>
          <PapelitosComponent />
          <PapButton
            label={'Prev'}
            onClick={() => setActiveIndex(0)}
          ></PapButton>
          <PapButton
            label={'Next'}
            onClick={() => setActiveIndex(2)}
          ></PapButton>
        </div>
      )}
      {activeIndex === 2 && (
        <div style={viewStyle}>
          <PapButton
            label={'Start'}
            onClick={() => {
              setActiveIndex(-1)
              setIsReadyToStartGame(true)
            }}
          ></PapButton>
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
