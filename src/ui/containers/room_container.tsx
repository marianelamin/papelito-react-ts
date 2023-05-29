import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '+redux/store'
import { exitRoom } from '+redux/feature/room/room_slice'

import { useRoom } from 'hooks'

import { PapelitoGame } from 'ui/views/papelito_game'
import { PapSpeedDial } from 'ui/components/common'
import { PlayerListComponent } from 'ui/components'
import { ToolbarContainer } from './toolbar_container'
import {
  PLAYER_DETAILS_DIALOG,
  ROOM_DETAILS_DIALOG,
  useGlobalDialog,
} from 'utilities/context/globalDialogContext'
import { useAlert } from 'utilities/context/globalAlertContext'

const RoomContainer: FC = () => {
  const navigate = useNavigate()
  const { enqueueInfoAlert, enqueueSuccessAlert, enqueueErrorAlert } =
    useAlert()
  const { showModal, hideModal } = useGlobalDialog()

  const appDispatch = useAppDispatch()
  const {} = useRoom() // to keep listening to changes in the room document

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => {
        showModal(ROOM_DETAILS_DIALOG, { close: hideModal })
        enqueueInfoAlert({
          title: 'Add',
          text: 'Data Added',
        })
      },
    },
    {
      label: 'Player',
      icon: 'pi pi-user',
      command: () => {
        showModal(PLAYER_DETAILS_DIALOG, { close: hideModal })
        enqueueSuccessAlert({
          title: 'Update',
          text: 'Data Updated',
        })
      },
    },
    {
      label: 'Leave Room',
      icon: 'pi pi-sign-out',
      command: () => {
        enqueueErrorAlert({
          title: 'Leaving',
          text: 'Leaving Room....',
        })
        setTimeout(() => {
          leaveRoom()
        }, 1000)
      },
    },
  ]

  const leaveRoom = async () => {
    await appDispatch(exitRoom()).unwrap()

    navigate('/home')
  }

  return (
    <div>
      <ToolbarContainer />
      <br />
      <div className="card">
        <div style={{ position: 'relative', height: '5rem' }}>
          <PapSpeedDial items={items}></PapSpeedDial>
        </div>
      </div>
      <br />

      <PlayerListComponent />
      <PapelitoGame />
      <br />
      <br />
      <div> PAPELITO por {process.env.REACT_APP_AUTHOR}</div>
    </div>
  )
}

export default RoomContainer
