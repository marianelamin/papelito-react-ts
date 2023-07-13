import React, { FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState, useAppDispatch } from '+redux/store'
import { notifyError } from 'helpers'
import { roomSlice, getRoomTh } from '+redux/feature/room/room_slice'
import { playerSlice } from '+redux/feature/player/player_slice'
import { PapelitoLocalStorage } from 'local-storage'

import * as roomService from '../../../services/room_service'

import {
  PapDialog,
  PapInputText,
  PapButton,
  PapDivider,
} from 'ui/components/common'
import { useAlert } from 'utilities/context/globalAlertContext'
import { ROOM_PATH } from 'ui/routes'
import {
  CREATE_ROOM_DIALOG,
  JOIN_ROOM_DIALOG,
  useGlobalDialog,
} from 'utilities/context/globalDialogContext'

const HomeContainer: FC = () => {
  const appDispatch = useAppDispatch()
  const navigate = useNavigate()
  const { notifyErrorAlert } = useAlert()
  const { showModal, hideModal } = useGlobalDialog()

  // store state
  const room = useSelector((state: RootState) => state.room)

  // local state
  const [roomCodeInput, setRoomCodeInput] = useState<string>('')
  const [playerNameInput, setPlayerNameInput] = useState<string>('')
  const [displayBasic, setDisplayBasic] = useState(false)
  const [hideCodeInputText, setHideCodeInputText] = useState(false)
  const [showClassError, setShowClassError] = useState(false)

  const handleChangeRoomText = useCallback((event: any) => {
    setRoomCodeInput(event.target.value.trim())
    setShowClassError(false)
  }, [])

  const handleChangePlayerText = useCallback((event: any) => {
    setPlayerNameInput(event.target.value.trim())
    setShowClassError(false)
  }, [])

  const onShowJoinDialog = useCallback(() => {
    showModal(JOIN_ROOM_DIALOG, { join: joinRoom, close: hideModal })
    // setHideCodeInputText(false)
    // setDisplayBasic(true)
  }, [])

  const onShowCreateDialog = useCallback(() => {
    showModal(CREATE_ROOM_DIALOG, { create: createRoom, close: hideModal })
    // setHideCodeInputText(true)
    // setDisplayBasic(true)
  }, [])

  const handleHideDialog = useCallback(() => {
    setDisplayBasic(false)
    clearDialog()
  }, [])

  const clearDialog = useCallback(() => {
    setPlayerNameInput('')
    setRoomCodeInput('')
  }, [])

  const closeDialogAndClearForm = useCallback(() => {
    clearDialog()
    handleHideDialog()
  }, [])

  const joinRoom = async (
    playerName: string,
    roomCode: string
  ): Promise<void> => {
    console.log(`Requested to join a room with id: ${roomCode}`)

    if (!playerName) {
      notifyErrorAlert({
        title: 'Missing info',
        text: 'need player name',
      })
      return
    }
    if (!roomCode) {
      notifyErrorAlert({
        title: 'Missing info',
        text: 'need room code',
      })
      return
    }

    try {
      const res = await roomService.joinRoom(roomCode, playerName)

      appDispatch(roomSlice.actions.setRoom(res.room))
      appDispatch(playerSlice.actions.setCurrentPlayer(res.player))

      PapelitoLocalStorage.setRoomId(res.room.id)
      PapelitoLocalStorage.setUserId(res.player.id)
      closeDialogAndClearForm()
      navigate(ROOM_PATH)
    } catch (error) {
      setShowClassError(true)
      notifyErrorAlert({
        title: 'Unable to join',
        text: 'Error joining a room',
      })
    }
  }

  const createRoom = useCallback(
    async (playerName: string): Promise<void> => {
      if (!playerName) {
        console.log('need player name')
        return
      }

      try {
        console.log({ playerName })
        const res = await roomService.createRoom(playerName)
        appDispatch(roomSlice.actions.setRoom(res.room))
        appDispatch(playerSlice.actions.setCurrentPlayer(res.player))
        PapelitoLocalStorage.setRoomId(res.room.id)
        PapelitoLocalStorage.setUserId(res.player.id)
        closeDialogAndClearForm()
        navigate(ROOM_PATH)
      } catch (error) {
        console.log({ error })
        setShowClassError(true)
        notifyErrorAlert({
          title: 'Unable to join',
          text: 'Error creating a room',
        })
      }
    },
    [appDispatch, notifyErrorAlert, closeDialogAndClearForm]
  )

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Home Page</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          minHeight: '300px',
          alignItems: 'center',
        }}
      >
        <PapButton
          label="Join Room"
          icon="pi pi-external-link"
          onClick={onShowJoinDialog}
        />

        <PapDivider text="OR"></PapDivider>

        <PapButton
          label="Create Room"
          icon="pi pi-external-link"
          onClick={onShowCreateDialog}
        />
      </div>
      <div>
        <p>PAPELITO por {process.env.REACT_APP_AUTHOR}</p>
      </div>
    </div>
  )
}

export default HomeContainer
