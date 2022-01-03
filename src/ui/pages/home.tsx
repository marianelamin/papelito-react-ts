import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

import { RootState, useAppDispatch } from '+redux/store'
import { roomSlice, getRoomTh } from '+redux/feature/room/room_slice'
import {
  playerSlice,
  addPlayerToRoomTh,
} from '+redux/feature/player/player_slice'
import PapelitoLocalStorage from 'localStorage'

import * as roomService from '../../services/room_service'
import * as playersService from '../../services/player_service'

import { Room, Player } from 'papelito-models'

const Home: FC = () => {
  const appDispatch = useAppDispatch()
  const navigate = useNavigate()

  const notifyError = (error: Error) => {
    console.error(error.message)
  }

  const navigateToRoomPage = (roomCode: string) => {
    console.log(`roomCode is ${roomCode}`)
    navigate(`/room/${roomCode}`)
  }

  const joinRoom = () => {
    console.log(`Requested to join a room with id: ${roomCodeInput}`)

    if (!playerNameInput) {
      console.log('need player name')
      return
    }
    if (!roomCodeInput) {
      console.log('need room code')
    }

    let playerName = playerNameInput.trim()
    roomService
      .joinRoom(roomCodeInput.trim(), playerName)
      .then((res) => {
        appDispatch(roomSlice.actions.setRoom(res.room))
        appDispatch(playerSlice.actions.setCurrentPlayer(res.player))

        PapelitoLocalStorage.setRoomId(res.room.id)
        PapelitoLocalStorage.setPlayerId(res.player.id)
        closeDialogAndClearForm()
        navigateToRoomPage(res.room.id)
      })
      .catch((error) => {
        setShowClassError(true)
        notifyError(error)
      })
  }

  const createRoom = () => {
    // Todo: create a room and get the room code back
    if (!playerNameInput) {
      console.log('need player name')
      return
    }
    let playerName = playerNameInput.trim()

    console.log('Request to creating a room')

    roomService
      .createRoom(playerName)
      .then((res) => {
        appDispatch(roomSlice.actions.setRoom(res.room))
        appDispatch(playerSlice.actions.setCurrentPlayer(res.player))
        PapelitoLocalStorage.setRoomId(res.room.id)
        PapelitoLocalStorage.setPlayerId(res.player.id)
        closeDialogAndClearForm()
        // navigate to the room page
        navigateToRoomPage(res.room.id)
      })
      .catch((error) => {
        setShowClassError(true)
        notifyError(error)
      })
  }

  // const addPlayer = () => {
  //   let playerName = 'Marianela'
  //   let addedPlayer
  //   if (room.roomId) {
  //     addedPlayer = playersService
  //       .addPlayerToRoom(room.roomId, playerName)
  //       .then((addedPlayer: Player) => {
  //         console.log(
  //           `successfuly added player with name : ${addedPlayer.name}`
  //         )
  //       })
  //       .catch((error) => notifyError(error))
  //   } else {
  //     notifyError(new Error('Problem with adding player'))
  //   }
  // }

  // store state
  const room = useSelector((state: RootState) => state.room)

  // local state
  const [roomCodeInput, setRoomCodeInput] = useState<string>('')
  const [playerNameInput, setPlayerNameInput] = useState<string>('')
  const [displayBasic, setDisplayBasic] = useState(false)
  const [hideCodeInputText, setHideCodeInputText] = useState(false)
  const [showClassError, setShowClassError] = useState(false)

  const onChangeRoomText = (event: any) => {
    setRoomCodeInput(event.target.value)
    setShowClassError(false)
  }
  const onChangePlayerText = (event: any) => {
    setPlayerNameInput(event.target.value)
    setShowClassError(false)
  }

  const onShowDialog = (type: string) => {
    switch (type) {
      case 'JOIN': {
        setHideCodeInputText(false)
        setDisplayBasic(true)
        break
      }
      case 'CREATE': {
        setHideCodeInputText(true)
        setDisplayBasic(true)
        break
      }
      default:
        setDisplayBasic(false)
    }
  }
  const onHideDialog = () => {
    console.log('need to reset dialog form')
    setDisplayBasic(false)
  }
  const onClearDialog = () => {
    setPlayerNameInput('')
    setRoomCodeInput('')
  }

  const closeDialogAndClearForm = () => {
    onClearDialog()
    onHideDialog()
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Home Page</h1>

      <div>
        <Button
          label="Join Room"
          icon="pi pi-external-link"
          onClick={() => onShowDialog('JOIN')}
        />
      </div>
      <br />
      <div>
        <Button
          label="Create Room"
          icon="pi pi-external-link"
          onClick={() => onShowDialog('CREATE')}
        />
      </div>

      <br />
      <br />
      <div>PAPELITO por {process.env.REACT_APP_AUTHOR}</div>

      <Dialog
        header={hideCodeInputText ? 'Create a Room' : 'Join a Room'}
        visible={displayBasic}
        style={{ width: '50vw' }}
        footer={
          <div>
            {hideCodeInputText ? (
              <div>
                <Button
                  label="Create Room"
                  iconPos="right"
                  loading={room.loading}
                  className={showClassError ? 'p-button-danger' : ''}
                  disabled={playerNameInput.length == 0}
                  onClick={createRoom}
                ></Button>
                <br />
                {showClassError ? (
                  <small className="p-error">There was an error</small>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <div>
                <Button
                  label="Join Room"
                  iconPos="right"
                  loading={room.loading}
                  className={showClassError ? 'p-button-danger' : ''}
                  disabled={
                    roomCodeInput.length == 0 || playerNameInput.length == 0
                  }
                  onClick={joinRoom}
                ></Button>
                <br />
                {showClassError ? (
                  <small className="p-error">There was an error</small>
                ) : (
                  ''
                )}
              </div>
            )}
          </div>
        }
        onHide={() => {
          console.log('hiding... displayBasic')
          onHideDialog()
        }}
      >
        <InputText
          id="roomCodeField"
          type="text"
          placeholder="Enter room code..."
          hidden={hideCodeInputText}
          value={roomCodeInput}
          onChange={onChangeRoomText}
        />
        <InputText
          id="playerNameField"
          type="text"
          placeholder="Enter player name..."
          value={playerNameInput}
          onChange={onChangePlayerText}
        />
      </Dialog>
    </div>
  )
}

export default Home
