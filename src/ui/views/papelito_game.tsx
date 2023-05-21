import React, { useState, useEffect } from 'react'

import { Papelito, Player, Team, Room } from 'papelito-models'

import { PapelitoBowlComponent } from 'ui/components'
import { useSelector } from 'react-redux'

// import bowlActions from 'redux/actions/bowl_actions'
import { roomSlice, RoomState } from '+redux/feature/room/room_slice'
import { playerSlice, PlayerState } from '+redux/feature/player/player_slice'
import {
  teamsSlice,
  TeamsState,
  fetchAllPlayers,
} from '+redux/feature/team/team_slice'
import { bowlSlice, BowlState, addToBowl } from '+redux/feature/bowl/bowl_slice'
import {
  papelitoSlice,
  PapelitoState,
} from '+redux/feature/papelito/papelito_slice'
import { RootState, useAppDispatch } from '+redux/store'

// ---------------------------

// ---------------------------

const PapelitoWrapper = (props: { currentPlayer?: Player }) => {
  const { currentPlayer } = props

  // useEffect(() => {
  //   // make this into a hook
  //   appDispatch(fetchAllPlayers())
  //   return () => {
  //     console.log('clean up when done.. effect done')
  //   }
  // }, [])
  // from redux store
  const appDispatch = useAppDispatch()

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

  // to be kept in component
  const [papelitoShown, setPapelitoShown] = useState<Papelito | undefined>(
    undefined
  )

  const guessPapelito = (papelitoGuessed: any) => {
    console.log('this papelito should be marked as guessed')
    console.log(papelitoGuessed)
    // dispatcher(bowlSlice. guessPapelitoAction(papelitoGuessed))
  }

  const drawPapelito = () => {
    /** @todo: make an API call to Firestore get a papelito */
    // let papelitos = bowlState
    // let selectedPapelito =
    //   papelitos[Math.floor(Math.random() * papelitos.length)]
    // console.log(`lanzate un papelito ahi:`)
    // console.log(selectedPapelito)
    // setPapelitoShown(selectedPapelito)
  }

  const deletePlayer = (player: Player) => console.log(`delete: ${player}`)

  // const passBowlToPlayer = (player: Player) => {
  //   players.map((p) => {
  //     if (p == player) {
  //       p.id == room.activeTurn?.activePlayerId
  //     } else {
  //       p.activeInTurn = false
  //     }
  //     console.log(`passBowlToPlayer: `)
  //     console.log(player)

  //     return p
  //   })
  // }

  // const playerActionItems = [
  //   {
  //     onClickHandler: deletePlayer,
  //     actionLabel: 'Delete',
  //   },
  //   {
  //     onClickHandler: () => {},
  //     actionLabel: 'Pass Bowl',
  //   },
  // ]

  return (
    <div>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <span>
          Player: <b>{currentPlayer?.name}</b> (
          {currentPlayer?.id == roomState.room?.activeTurn?.activePlayerId
            ? 'Your turn'
            : 'Not your turn'}
          )
        </span>
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
