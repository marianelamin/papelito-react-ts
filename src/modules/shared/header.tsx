import { ReactNode, useCallback } from 'react'
import { Toolbar } from 'primereact/toolbar'
import { PapButton, PapSideBar } from '../../ui/components/common'
import { PapGameStats } from '../room/features/game/game-stats'
import { RoomDetails } from '../../ui/components/room-details'
import { useNavigate } from 'react-router'

import { useAppDispatch } from '../../store-redux/store'
import { exitRoom } from '../../store-redux/feature/room/room_slice'

import { useAlert } from '../../utilities/context/globalAlertContext'
import { useUser } from '../core/user/context/UserContext'
import { Players } from '../room/features/players/players'

export const Header = (): ReactNode => {
  const appDispatch = useAppDispatch()
  const navigate = useNavigate()
  const { notifyInfoAlert, notifySuccessAlert, notifyErrorAlert } = useAlert()
  const { room } = useUser()

  const leaveRoom = useCallback(async (): Promise<void> => {
    await appDispatch(exitRoom()).unwrap()
    navigate('/')
  }, [])

  const handleLeaveRoom = useCallback(() => {
    notifyInfoAlert({
      title: 'Leaving',
      text: 'Leaving Room....'
    })
    alert(
      `TODO: create a dialog for this\n\nYou are leaving the room... if this is a mistake you will have to re join the room. Just need to provide the room code:\n\nRoom Code: ${room?.id}`
    )
    setTimeout(() => {
      leaveRoom()
        .then(() => {
          notifySuccessAlert({ title: 'Comeback soon' })
        })
        .catch((err) => {
          console.error({ err })
          notifyErrorAlert({ title: 'No se logro' })
        })
    }, 1000)
  }, [notifySuccessAlert, notifyErrorAlert, notifyInfoAlert, leaveRoom])

  return (
    <Toolbar
      start={<h1>Room</h1>}
      end={
        <div className="flex gap-3">
          <PapSideBar icon="pi-home" tooltip="Room Details">
            <RoomDetails />
          </PapSideBar>

          <PapSideBar icon="pi-user" tooltip="Players">
            <Players />
          </PapSideBar>

          <PapSideBar icon="pi-chart-bar" tooltip="Stats">
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
