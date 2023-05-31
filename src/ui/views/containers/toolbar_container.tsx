import { Toolbar } from 'primereact/toolbar'
import { PapelitosComponent } from 'ui/components'
import { PapSideBar, PapSpeedDial } from 'ui/components/common'
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
export const ToolbarContainer = (): JSX.Element => {
  const appDispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    notifyInfoAlert: enqueueInfoAlert,
    notifySuccessAlert: enqueueSuccessAlert,
    notifyErrorAlert: enqueueErrorAlert,
  } = useAlert()
  const { showModal, hideModal } = useGlobalDialog()

  const leaveRoom = async () => {
    await appDispatch(exitRoom()).unwrap()
    navigate('/home')
  }

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

  return (
    <Toolbar
      left={
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
      right={
        <>
          <PapSideBar
            icon="pi-home"
            btnLabel="Room Details"
            btnStyle={{ marginRight: '1rem' }}
          >
            <RoomDetails />
          </PapSideBar>

          <PapSideBar icon="pi-chart-bar" btnLabel="Stats" position={'right'}>
            <PapGameStats />
          </PapSideBar>
        </>
      }
    ></Toolbar>
  )
}
