import React, { useCallback } from 'react'
import { Toolbar } from 'primereact/toolbar'
import { PapButton, PapSideBar } from '../../ui/components/common'
import { PapGameStats } from '../../ui/components/game_stats'
import { RoomDetails } from '../../ui/components/room_details'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../store-redux/store'
import { exitRoom } from '../../store-redux/feature/room/room_slice'

import { useAlert } from '../../utilities/context/globalAlertContext'
import { useUser } from '../../utilities/context/userContext'
import { Players } from '../../ui/components'
export const ToolbarContainer = (): JSX.Element => {
  const appDispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    notifyInfoAlert: enqueueInfoAlert,
    notifySuccessAlert: enqueueSuccessAlert,
    notifyErrorAlert: enqueueErrorAlert
  } = useAlert()
  const { roomId } = useUser()

  const leaveRoom = async (): Promise<void> => {
    await appDispatch(exitRoom()).unwrap()
    navigate('/home')
  }

  const handleLeaveRoom = useCallback(() => {
    enqueueInfoAlert({
      title: 'Leaving',
      text: 'Leaving Room....'
    })
    alert(
      `TODO: create a dialog for this\n\nYou are leaving the room... if this is a mistake you will have to re join the room. Just need to provide the room code:\n\nRoom Code: ${roomId}`
    )
    setTimeout(() => {
      leaveRoom()
        .then(() => {
          enqueueSuccessAlert({ title: 'Comeback soon' })
        })
        .catch((err) => {
          console.error({ err })
          enqueueErrorAlert({ title: 'No se logro' })
        })
    }, 1000)
  }, [enqueueInfoAlert, leaveRoom])

  return (
    <Toolbar
      start={<h1>Room</h1>}
      end={
        <div className="flex gap-3">
          <PapSideBar icon="pi-home" tooltip="Room Details">
            <RoomDetails />
          </PapSideBar>

          <PapSideBar icon="pi-user" tooltip="Players" position={'right'}>
            <Players />
          </PapSideBar>

          <PapSideBar icon="pi-chart-bar" tooltip="Stats" position={'right'}>
            <PapGameStats />
          </PapSideBar>

          <PapButton
            tooltip="Leave"
            icon="pi pi-sign-out"
            onClick={handleLeaveRoom}
            severity="danger"
          />
        </div>
      }
    />
  )
}
