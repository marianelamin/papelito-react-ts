import React, { useState } from 'react'
import { ActionListComponent } from 'ui/components/action_list'

import { Papelito, Player, Team, Room } from 'papelito-models'

import { AddPapelitoComponent } from 'ui/components/add_papelito'
import { PapelitoListComponent } from 'ui/components/papelito_list'
import { PapelitoBowlComponent } from 'ui/components/papelito_bolw'
import { useDispatch, useSelector } from 'react-redux'

// import bowlActions from 'redux/actions/bowl_actions'
import * as bowlSlice from '+redux/bowl/bowl_slice'
import * as papelitoSlice from '+redux/papelito/papelito_slice'
import { RootState, useAppDispatch } from '+redux/store'
import { GameActions } from '+redux/enum_actions'

// ---------------------------

// ---------------------------

const PapelitoWrapper = (props: any) => {
  // from redux store
  const dispatcher = useAppDispatch()

  const teams = useSelector<RootState, Team[]>((state) => state.teams.allTeams)
  const currentTeam = useSelector<RootState, Team>(
    (state) => state.teams.currentTeam
  )
  const currentPlayer = useSelector<RootState, Player>(
    (state) => state.teams.currentPlayer
  )
  const players = currentTeam.players.map((player: Player) =>
    playerTransform(player)
  )

  const myPapelitoList = useSelector<RootState, Papelito[]>((state) => {
    console.log(state)
    return state.bowl.bowl.concat(state.bowl.guessed)
  })

  const papelitosInBowl = useSelector<RootState, Papelito[]>((state) => {
    console.log(state)
    return state.bowl.bowl
  })

  // to be kept in component
  const [papelitoShown, setPapelitoShown] = useState<Papelito | undefined>(
    undefined
  )

  // const saveNewPapelito = (papelitoToSave: Papelito) => {
  //   papelitoToSave.author = currentPlayer
  //   console.log(papelitoToSave)
  //   dispatcher(playerScratchBoard.addOne)
  // }

  function deletePapelito(papelitoToRemove: Papelito) {
    // if papelito deletes was the one shown, update this
    if (papelitoToRemove === papelitoShown) setPapelitoShown(undefined)
    // dispatcher(papelitoActions.removePapelitoAction(papelitoToRemove))
  }

  // this one will get papelitos written but not in bown yet, once they are in bowl owner ca no longer delete or edit.
  const throwPapelitoInBowl = (papelitoToBowl: Papelito) => {
    dispatcher(bowlSlice.addOne(papelitoToBowl))
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
        <h3>From DB</h3>
        <ol>
          <li>id: {props.room?.id}</li>
          <li>private: {props.room?.private}</li>
          <li>password: {props.room?.password}</li>
          <li>bowl: {props.room?.bowl}</li>
          <li>previousTeam: {props.room?.previousTeam}</li>
          <li>currentTeam: {props.room?.currentTeam}</li>
          <li>nextTeam: {props.room?.nextTeam}</li>
          <li>round: {props.room?.round}</li>
          <li>teams: {props.room?.teams}</li>
        </ol>
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
      {/* <PapelitoListComponent
        papelitoList={myPapelitoList}
        deletePapelito={deletePapelito}
        throwPapelitoinBowl={throwPapelitoInBowl}
      ></PapelitoListComponent> */}

      {/* <AddPapelitoComponent onSavePapelito={saveNewPapelito}></AddPapelitoComponent> */}

      {/* <hr /> */}
      {/* These are the papelitos that are ready tobe used in the game */}
      {/* <div>
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
        papelitoShown={papelitoShown}
        bowlSize={papelitosInBowl.length}
        papelitoDrawn={drawPapelito}
        papelitoGuessed={guessPapelito}
      ></PapelitoBowlComponent> */}
    </div>
  )
}

// ---------------------------

export default PapelitoWrapper
