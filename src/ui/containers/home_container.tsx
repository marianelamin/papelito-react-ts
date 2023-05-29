import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from '+redux/store'
import { notifyError } from 'helpers'
import { roomSlice, getRoomTh } from '+redux/feature/room/room_slice'
import { playerSlice } from '+redux/feature/player/player_slice'
import { PapelitoLocalStorage } from 'localStorage'

import * as roomService from '../../services/room_service'

import {
  PapDialog,
  PapInputText,
  PapButton,
  PapDivider,
} from 'ui/components/common'

const HomeContainer: FC = () => {
  const appDispatch = useAppDispatch()
  const navigate = useNavigate()

  // store state
  const room = useSelector((state: RootState) => state.room)

  // local state
  const [roomCodeInput, setRoomCodeInput] = useState<string>('')
  const [playerNameInput, setPlayerNameInput] = useState<string>('')
  const [displayBasic, setDisplayBasic] = useState(false)
  const [hideCodeInputText, setHideCodeInputText] = useState(false)
  const [showClassError, setShowClassError] = useState(false)

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
        PapelitoLocalStorage.setUserId(res.player.id)
        closeDialogAndClearForm()
        navigate('room')
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
        PapelitoLocalStorage.setUserId(res.player.id)
        closeDialogAndClearForm()
        // navigate to the room page
        navigate(`room`)
      })
      .catch((error) => {
        setShowClassError(true)
        notifyError(error)
      })
  }

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
    console.log('hiding... displayBasic')
    console.log('need to reset dialog form')
    setDisplayBasic(false)
    setPlayerNameInput('')
    setRoomCodeInput('')
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

      <div className="grid">
        <div className="col-5">
          <PapButton
            label="Join Room"
            icon="pi pi-external-link"
            onClick={() => onShowDialog('JOIN')}
          />
        </div>
        <div className="col-2">
          <PapDivider text="OR"></PapDivider>
        </div>
        <div className="col-5">
          <PapButton
            label="Create Room"
            icon="pi pi-external-link"
            onClick={() => onShowDialog('CREATE')}
          />
        </div>
      </div>

      <br />
      <br />
      <div>PAPELITO por {process.env.REACT_APP_AUTHOR}</div>

      <PapDialog
        headerLabel={hideCodeInputText ? 'Create a Room' : 'Join a Room'}
        visible={displayBasic}
        primaryButtonLabel={hideCodeInputText ? 'Create' : 'Join'}
        primaryButtonLoading={room.loading}
        primaryButtonDisabled={
          hideCodeInputText
            ? playerNameInput.length == 0
            : roomCodeInput.length == 0 || playerNameInput.length == 0
        }
        showPrimaryButtonError={false}
        showPrimaryButtonErrorText="An error"
        onPrimaryButton={(data: any) => {
          if (hideCodeInputText) {
            return createRoom()
          } else {
            return joinRoom()
          }
        }}
        onVisibleChange={(visible: boolean) => setDisplayBasic(visible)}
        onHideDialog={onHideDialog}
      >
        {!hideCodeInputText && (
          <PapInputText
            id="roomCodeField"
            label="Room code"
            value={roomCodeInput}
            onValueChange={onChangeRoomText}
          ></PapInputText>
        )}
        <br />
        <PapInputText
          id="playerNameField"
          label="Player name"
          value={playerNameInput}
          onValueChange={onChangePlayerText}
        ></PapInputText>
      </PapDialog>
    </div>
  )
}

export default HomeContainer
