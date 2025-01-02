import { type FC, useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { PapButton, PapDivider } from '../../../ui/components/common'
import { useAlert } from '../../../utilities/context/globalAlertContext'
import {
  CREATE_ROOM_DIALOG,
  JOIN_ROOM_DIALOG,
  useGlobalDialog
} from '../../../utilities/context/globalDialogContext'
import { useParams } from 'react-router'
import Footer from '../../shared/footer'
import { useRoomGameSetup } from '../hook/useRoomGameSetup'
import { ROOM_PATH } from '../../../routes'
import { useAuth } from '../../core/user/context/AuthContext'

const LoginContainer: FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { notifyErrorAlert } = useAlert()
  const { showModal, hideModal } = useGlobalDialog()
  const { roomId: roomIdFromParams } = useParams()
  const { createRoomAndSetup, joinRoom } = useRoomGameSetup()

  const [_roomCodeInput, setRoomCodeInput] = useState<string>('')
  const [_playerNameInput, setPlayerNameInput] = useState<string>('')

  const clearDialog = useCallback(() => {
    setPlayerNameInput('')
    setRoomCodeInput('')
  }, [])

  const handleHideDialog = useCallback(() => {
    clearDialog()
  }, [clearDialog])

  const closeDialogAndClearForm = useCallback(() => {
    clearDialog()
    handleHideDialog()
  }, [clearDialog, handleHideDialog])

  const handleJoinRoom = useCallback(
    async (playerName: string, roomCode: string): Promise<void> => {
      try {
        const success = await joinRoom(roomCode, playerName)
        login(success)
        closeDialogAndClearForm()
        navigate(ROOM_PATH)
      } catch (error) {
        notifyErrorAlert({
          title: 'Oops!',
          text: 'Error joining a room'
        })
      }
    },
    [joinRoom, closeDialogAndClearForm, notifyErrorAlert, navigate, login]
  )

  const handleCreateRoom = useCallback(
    async (playerName: string): Promise<void> => {
      try {
        const success = await createRoomAndSetup(playerName)
        login(success)
        closeDialogAndClearForm()
        navigate(ROOM_PATH)
      } catch (error) {
        notifyErrorAlert({
          title: 'Oops!',
          text: 'Error creating a room'
        })
      }
    },
    [createRoomAndSetup, closeDialogAndClearForm, notifyErrorAlert, navigate, login]
  )

  const onShowJoinDialog = useCallback(() => {
    showModal(JOIN_ROOM_DIALOG, {
      join: handleJoinRoom,
      roomCode: roomIdFromParams,
      close: hideModal
    })
  }, [roomIdFromParams, handleJoinRoom, hideModal])

  const onShowCreateDialog = useCallback(() => {
    showModal(CREATE_ROOM_DIALOG, { create: handleCreateRoom, close: hideModal })
  }, [handleCreateRoom, hideModal])

  useEffect(() => {
    if (roomIdFromParams) onShowJoinDialog()
    return () => {}
  }, [roomIdFromParams])

  return (
    <>
      <h1>Papelito en Los Mendoza</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          alignItems: 'center'
        }}
      >
        <PapButton label="Join Room" icon="pi pi-external-link" onClick={onShowJoinDialog} />
        <PapDivider text="OR"></PapDivider>
        <PapButton label="Create Room" icon="pi pi-external-link" onClick={onShowCreateDialog} />
      </div>
      <Footer />
    </>
  )
}

export default LoginContainer
