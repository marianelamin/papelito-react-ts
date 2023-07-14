import { useCallback, useEffect, useMemo, useState } from 'react'
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

const viewStyle = { minHeight: '250px' }

const items = [
  {
    label: 'Instructions',
  },
  {
    label: 'Submit papelitos',
  },
]

export const PapelitoGame = () => {
  const { currentPlayer } = usePlayer()

  const [activeIndex, setActiveIndex] = useState(1)

  const hasSubmittedPapelitos = useMemo(
    () => currentPlayer?.hasSubmittedPapelitos,
    [currentPlayer?.hasSubmittedPapelitos]
  )

  const goToNext = useCallback(() => setActiveIndex((prev) => prev + 1), [])
  const goToBack = useCallback(() => setActiveIndex((prev) => prev - 1), [])
  const goToStartGame = useCallback(() => setActiveIndex(-1), [])

  const [papelitoShown, setPapelitoShown] = useState<Papelito>()
  const roomState: RoomState = useSelector<RootState, RoomState>(
    (state) => state.room
  )
  const bowlState = useSelector<RootState, BowlState>((state) => state.bowl)
  const players = useSelector<RootState, Player[]>(
    (state) => state.teams.allPlayers
  )
  const drawPapelito = () => {}
  const guessPapelito = useCallback((papelitoGuessed: any) => {
    console.log('this papelito should be marked as guessed')
    console.log(papelitoGuessed)
  }, [])

  useEffect(() => {
    if (hasSubmittedPapelitos) {
      goToStartGame()
    }
    return () => {}
  }, [hasSubmittedPapelitos])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <p>
          <span>Hello </span>
          <b>{currentPlayer?.name}</b>
        </p>
      </div>

      {!hasSubmittedPapelitos && (
        <div>
          <Steps model={items} activeIndex={activeIndex} />
        </div>
      )}
      {!hasSubmittedPapelitos && activeIndex === 0 && (
        <>
          <div style={viewStyle}>
            <br />
            <Instructions />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <PapButton label={'Next'} onClick={goToNext}></PapButton>
          </div>
        </>
      )}
      {!hasSubmittedPapelitos && activeIndex === 1 && (
        <>
          <div style={viewStyle}>
            <br />
            <PapelitosComponent />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <PapButton label={'Prev'} onClick={goToBack}></PapButton>
          </div>
        </>
      )}

      {hasSubmittedPapelitos && (
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
