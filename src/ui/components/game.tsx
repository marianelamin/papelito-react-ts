import { useSelector } from 'react-redux'

import { type Player } from '../../papelito-models'

import { PapelitoTurnComponent } from '.'

import { type RootState } from '../../store-redux/store'
import { type RoomState } from '../../store-redux/feature/room/room_slice'
import { type BowlState } from '../../store-redux/feature/bowl/bowl_slice'

const viewStyle = {
  minHeight: '250px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexWwrap: 'nowrap'
}

export const Game = (): JSX.Element => {
  const roomState: RoomState = useSelector<RootState, RoomState>((state) => state.room)
  const bowlState = useSelector<RootState, BowlState>((state) => state.bowl)
  const players = useSelector<RootState, Player[]>((state) => state.teams.allPlayers)

  return (
    <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
      <div style={viewStyle}>
        <PapelitoTurnComponent
          bowlMax={players.length * (roomState.room?.settings?.papelitoPerPlayer ?? 1)}
          bowlSize={bowlState.bowlSize}
        />
      </div>
    </div>
  )
}
