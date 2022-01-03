import React, { useState } from 'react'
import { ActionListComponent } from 'ui/components/action_list'

import { Papelito, Player, Team, Room } from 'papelito-models'

import { AddPapelitoComponent } from 'ui/components/add_papelito'
import { PapelitoListComponent } from 'ui/components/papelito_list'
import { PapelitoBowlComponent } from 'ui/components/papelito_bolw'
import { useSelector } from 'react-redux'

// import bowlActions from 'redux/actions/bowl_actions'
import { roomSlice, RoomState } from '+redux/feature/room/room_slice'
import { playerSlice, PlayerState } from '+redux/feature/player/player_slice'
import { bowlSlice, BowlState, addToBowl } from '+redux/feature/bowl/bowl_slice'
import {
  papelitoSlice,
  PapelitoState,
} from '+redux/feature/papelito/papelito_slice'
import { RootState, useAppDispatch } from '+redux/store'

// ---------------------------

// ---------------------------

const PapelitoWrapper = (props: any) => {
  // from redux store
  const appDispatch = useAppDispatch()

  const room: RoomState = useSelector<RootState, RoomState>(
    (state) => state.room
  )
  const currentPlayer = useSelector<RootState, Player>(
    (state) =>
      new Player(
        state.currentPlayer.id,
        state.currentPlayer.name,
        state.currentPlayer.activeInTurn,
        state.currentPlayer.order,
        state.currentPlayer.teamId
      )
  )

  const teams = useSelector<RootState, Team[]>((state) => state.teams.allTeams)
  const currentTeam = useSelector<RootState, Team>(
    (state) => state.teams.currentTeam
  )

  const myPapelitoList = useSelector<RootState, Papelito[]>(
    (state) => state.papelito.myPapelitos
  )

  const papelitosInBowl = useSelector<RootState, Papelito[]>((state) => {
    console.log(state)
    return state.bowl.bowl
  })

  const players = currentTeam.players.map((player: Player) =>
    playerTransform(player)
  )

  // to be kept in component
  const [papelitoShown, setPapelitoShown] = useState<Papelito | undefined>(
    undefined
  )

  // no api calls, only on redux state
  const saveNewPapelito = (papelitoToSave: Papelito) => {
    papelitoToSave.author = currentPlayer
    console.log(papelitoToSave)
    appDispatch(papelitoSlice.actions.addToMyPapelitos(papelitoToSave))
  }

  // no api calls, only on redux state
  function deletePapelito(papelitoToRemove: Papelito) {
    // if papelito deletes was the one shown, update this
    if (papelitoToRemove === papelitoShown) setPapelitoShown(undefined)
    appDispatch(
      papelitoSlice.actions.removeFromMyPapelitos(papelitoToRemove.id)
    )
  }

  // this one will get papelitos written but not in bown yet, once they are in bowl owner ca no longer delete or edit.
  const throwPapelitoInBowl = (papelitosToBowl: Papelito[]) => {
    appDispatch(addToBowl(papelitosToBowl))
  }

  const guessPapelito = (papelitoGuessed: any) => {
    console.log('this papelito should be marked as guessed')
    console.log(papelitoGuessed)
    // dispatcher(bowlSlice. guessPapelitoAction(papelitoGuessed))
  }

  const drawPapelito = () => {
    let papelitos = papelitosInBowl
    let selectedPapelito =
      papelitos[Math.floor(Math.random() * papelitos.length)]
    console.log(`lanzate un papelito ahi:`)
    console.log(selectedPapelito)
    setPapelitoShown(selectedPapelito)
  }

  const deletePlayer = (player: Player) => console.log(`delete: ${player}`)

  const passBowlToPlayer = (player: Player) => {
    players.map((item) => {
      if (item.item === player) {
        item.item.activeInTurn = true
      } else {
        item.item.activeInTurn = false
      }
      console.log(`passBowlToPlayer: `)
      console.log(player)

      return item
    })
  }

  function playerTransform(player: Player) {
    return { renderName: player.name, item: player }
  }

  const playerActionItems = [
    {
      onClickHandler: deletePlayer,
      actionLabel: 'Delete',
    },
    {
      onClickHandler: passBowlToPlayer,
      actionLabel: 'Pass Bowl',
    },
  ]

  return (
    <div>
      <div>
        <h3>Current Player</h3>
        <pre>{JSON.stringify(currentPlayer, null, 2)}</pre>
      </div>
      <hr />
      <ActionListComponent
        listItems={players}
        actionItems={playerActionItems}
      ></ActionListComponent>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <span>
          Player: <b>{currentPlayer.name}</b> (
          {currentPlayer.activeInTurn ? 'Your turn' : 'Not your turn'})
        </span>
      </div>

      {/* Go in its own component,  this is only for when the player is "writing" papelitos but has not put them into the bowl */}
      <PapelitoListComponent
        papelitoList={myPapelitoList}
        onDeleteItem={deletePapelito}
        onSendToBowl={throwPapelitoInBowl}
      ></PapelitoListComponent>

      <AddPapelitoComponent
        onSavePapelito={saveNewPapelito}
      ></AddPapelitoComponent>

      <hr />
      {/* These are the papelitos that are ready tobe used in the game */}
      <div>
        <h3>Papelitos in Bowl</h3>
        <ol>
          {papelitosInBowl.map((papelito: Papelito) => (
            <li key={papelito.id}>
              <div>
                {papelito.id} ({papelito.guessed ? 'guessed' : 'not guessed'}) -{' '}
                {papelito.text}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <PapelitoBowlComponent
        papelitoList={papelitosInBowl}
        currentPapelitoDisplay={papelitoShown}
        bowlSize={papelitosInBowl.length}
        onDrawPapelito={drawPapelito}
        onGuessPapelito={guessPapelito}
      ></PapelitoBowlComponent>
    </div>
  )
}

// ---------------------------

export default PapelitoWrapper
