import { useMemo, useState } from 'react'

import { Papelito, Player } from 'papelito-models'

import { PapelitoBowlComponent } from 'ui/components'
import { useSelector } from 'react-redux'

import { RoomState } from '+redux/feature/room/room_slice'

import { BowlState } from '+redux/feature/bowl/bowl_slice'
import { RootState } from '+redux/store'

import { usePlayer } from 'hooks'
import { useUser } from 'utilities/context/userContext'

const PapelitoWrapper = () => {
  const { roomId, userId } = useUser()

  const { currentPlayer } = usePlayer(roomId, userId)

  console.log({ currentPlayer })
  const playerName = useMemo(() => currentPlayer?.name, [currentPlayer])

  const roomState: RoomState = useSelector<RootState, RoomState>(
    (state) => state.room
  )

  const bowlState = useSelector<RootState, BowlState>((state) => {
    // console.log(state.bowl.bowlSize)
    return state.bowl
  })

  const players = useSelector<RootState, Player[]>((state) => {
    return state.teams.allPlayers
  })

  const [papelitoShown, setPapelitoShown] = useState<Papelito>()

  const guessPapelito = (papelitoGuessed: any) => {
    console.log('this papelito should be marked as guessed')
    console.log(papelitoGuessed)
  }

  const drawPapelito = () => {}

  const deletePlayer = (player: Player) => console.log(`delete: ${player}`)

  return (
    <div>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        {` Player: ${playerName} `}(
        {currentPlayer?.id == roomState.room?.activeTurn?.activePlayerId
          ? 'Your turn'
          : 'Not your turn'}
        )
      </div>
      <PapelitoBowlComponent
        currentPapelitoDisplay={papelitoShown}
        bowlMax={
          players.length * (roomState.room?.settings?.papelitoPerPlayer ?? 1)
        }
        bowlSize={bowlState.bowlSize}
        onDrawPapelito={drawPapelito}
        onGuessPapelito={guessPapelito}
      ></PapelitoBowlComponent>
      <div>
        <h3>Bowl State | Not for now, but for when the game actually starts</h3>
        <pre>{JSON.stringify(bowlState, null, 2)}</pre>
      </div>

      <hr />
      {/* These are the papelitos that are ready to be used in the game */}
    </div>
  )
}

// ---------------------------

export default PapelitoWrapper
