import { Toolbar } from 'primereact/toolbar'
import { PapButton, PapSideBar, PapSpeedDial } from 'ui/components/common'
import { PapGameStats } from 'ui/components/game_stats'
import { RoomDetails } from 'ui/components/room_details'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '+redux/store'
import { exitRoom } from '+redux/feature/room/room_slice'

import {
  PLAYER_DETAILS_DIALOG,
  ROOM_DETAILS_DIALOG,
  useGlobalDialog,
} from 'utilities/context/globalDialogContext'
import { useAlert } from 'utilities/context/globalAlertContext'
import { useCallback } from 'react'
import { useUser } from 'utilities/context/userContext'
import { Players } from 'ui/components'
export const ToolbarContainer = (): JSX.Element => {
  const appDispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    notifyInfoAlert: enqueueInfoAlert,
    notifySuccessAlert: enqueueSuccessAlert,
    notifyErrorAlert: enqueueErrorAlert,
  } = useAlert()
  const { showModal, hideModal } = useGlobalDialog()
  const { roomId } = useUser()

  const leaveRoom = async () => {
    await appDispatch(exitRoom()).unwrap()
    navigate('/home')
  }

  const handleViewPlayers = useCallback(() => {
    showModal(PLAYER_DETAILS_DIALOG, { close: hideModal })
  }, [showModal, hideModal])

  const handleViewRoomDetails = useCallback(() => {
    showModal(ROOM_DETAILS_DIALOG, { close: hideModal })
  }, [showModal, hideModal])

  const handleLeaveRoom = useCallback(() => {
    enqueueInfoAlert({
      title: 'Leaving',
      text: 'Leaving Room....',
    })
    alert(
      `TODO: create a dialog for this\n\nYou are leaving the room... if this is a mistake you will have to re join the room. Just need to provide the room code:\n\nRoom Code: ${roomId}`
    )
    setTimeout(() => {
      leaveRoom()
    }, 1000)
  }, [enqueueInfoAlert, leaveRoom])

  const items = [
    {
      label: 'Room Details',
      icon: 'pi pi-home',
      command: handleViewRoomDetails,
    },
    {
      label: 'Players',
      icon: 'pi pi-user',
      command: handleViewPlayers,
    },
    {
      label: 'Leave Room',
      icon: 'pi pi-sign-out',
      command: handleLeaveRoom,
    },
  ]

  return (
    <Toolbar
      start={
        <>
          <h1>Room</h1>
          <PapSpeedDial
            items={items}
            radius={120}
            type="quarter-circle"
            direction="up-left"
            style={{ right: '1rem', bottom: '1rem' }}
          ></PapSpeedDial>
        </>
      }
      end={
        <div className="flex gap-3">
          <PapSideBar icon="pi-home" tooltip="Room Details">
            <RoomDetails />
          </PapSideBar>

          <PapSideBar icon="pi-chart-bar" tooltip="Stats" position={'right'}>
            <PapGameStats />
          </PapSideBar>

          <PapSideBar icon="pi-user" tooltip="Players" position={'right'}>
            <Players />
          </PapSideBar>
          <PapButton
            tooltip="Leave room"
            icon="pi pi-sign-out"
            onClick={handleLeaveRoom}
          />
        </div>
      }
    />
  )
}
