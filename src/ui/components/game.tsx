import { useCallback, useMemo } from 'react'

import { useSelector } from 'react-redux'

import { Player } from 'papelito-models'

import { PapelitoTurnComponent } from 'ui/components'

import { RootState } from '+redux/store'
import { RoomState } from '+redux/feature/room/room_slice'
import { BowlState } from '+redux/feature/bowl/bowl_slice'

import { usePlayer } from 'hooks'

const viewStyle = {
  minHeight: '250px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexWwrap: 'nowrap',
}

export const Game = (): JSX.Element => {
  const roomState: RoomState = useSelector<RootState, RoomState>(
    (state) => state.room
  )
  const bowlState = useSelector<RootState, BowlState>((state) => state.bowl)
  const players = useSelector<RootState, Player[]>(
    (state) => state.teams.allPlayers
  )

  const goToStartGame = useCallback(() => {
    // todo: Make a call to api to say we started the game
    console.log('Make a call to api to say we started the game')
  }, [])

  const { currentPlayer } = usePlayer()

  const hasSubmittedPapelitos = useMemo(
    () => currentPlayer?.hasSubmittedPapelitos,
    [currentPlayer?.hasSubmittedPapelitos]
  )

  return (
    <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
      <div style={viewStyle}>
        <PapelitoTurnComponent
          bowlMax={
            players.length * (roomState.room?.settings?.papelitoPerPlayer ?? 1)
          }
          bowlSize={bowlState.bowlSize}
        />
      </div>
    </div>
  )
}
