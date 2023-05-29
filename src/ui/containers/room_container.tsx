import { FC, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Toast } from 'primereact/toast'

/** Redux imports */
import { RootState, useAppDispatch } from '+redux/store'
import { exitRoom } from '+redux/feature/room/room_slice'

/** Hooks imports */
import { useRoom, usePlayer } from 'hooks'

/** Model imports */
import { Papelito, Room, Team } from 'papelito-models'

/** UI Component/View imports */
import { useUser } from 'utilities/context/userContext'
import PapelitoWrapper from 'ui/views/papelito_game'
import { PapDialog, PapSpeedDial, PapToast } from 'ui/components/common'
import { PlayerListComponent } from 'ui/components'
import { ToolbarContainer } from './toolbar_container'

const RoomContainer: FC = () => {
  const navigate = useNavigate()
  const toast = useRef<Toast>(null)

  const appDispatch = useAppDispatch()
  const {} = useRoom() // to keep listening to changes in the room document
  const { roomId, userId } = useUser()

  const { currentPlayer } = usePlayer(roomId, userId)

  /**
   *  selectors
   */
  const room = useSelector<RootState, Room | undefined>(
    (state) => state.room.room
  )
  const myPapelitoList = useSelector<RootState, Papelito[]>(
    (state) => state.papelito.myPapelitos
  )
  const teams = useSelector<RootState, Team[]>((state) => state.teams.allTeams)
  const currentTeam = useSelector<RootState, Team>(
    (state) =>
      state.teams.allTeams.filter((t) => t.id == state.teams.currentTeamId)[0]
  )

  /**
   * componenet state
   */
  const [showPlayerDetails, setShowPlayerDetails] = useState(false)
  const [showRoomDetails, setShowRoomDetails] = useState(false)
  const [primaryButtonLoading, setPrimaryButtonLoading] = useState(false)

  /**
   * Constants that define components ? maybe
   */
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      command: () => {
        setShowRoomDetails(true)
        toast?.current?.show({
          severity: 'info',
          summary: 'Add',
          detail: 'Data Added',
        })
      },
    },
    {
      label: 'Player',
      icon: 'pi pi-user',
      command: () => {
        setShowPlayerDetails(true)
        toast?.current?.show({
          severity: 'success',
          summary: 'Update',
          detail: 'Data Updated',
        })
      },
    },
    {
      label: 'Leave Room',
      icon: 'pi pi-sign-out',
      command: () => {
        toast?.current?.show({
          severity: 'error',
          summary: 'Leaving',
          detail: 'Leaving Room....',
        })
        setTimeout(() => {
          // remove player
          leaveRoom()
        }, 1000)
      },
    },
  ]

  const leaveRoom = async () => {
    await appDispatch(exitRoom())

    navigate('/home')
  }

  return (
    <div>
      <ToolbarContainer />
      {/* @todo: make this a pap component */}
      <br />
      <div className="card">
        <div style={{ position: 'relative', height: '5rem' }}>
          <PapSpeedDial items={items}></PapSpeedDial>
        </div>
      </div>
      <br />

      <PlayerListComponent />
      <PapelitoWrapper />
      <br />
      <br />
      <div> PAPELITO por {process.env.REACT_APP_AUTHOR}</div>
      <PapDialog
        headerLabel="Player Details"
        visible={showPlayerDetails}
        primaryButtonLabel={'Save'}
        primaryButtonLoading={primaryButtonLoading}
        primaryButtonDisabled={false}
        onPrimaryButton={(data: any) => {
          console.log('data comming back', data)
          setPrimaryButtonLoading(true)
          setTimeout(() => {
            setShowPlayerDetails(false)
            setPrimaryButtonLoading(false)
          }, 2000)
        }}
        onSecondaryButton={(data: any) => {
          console.log('data comming back', data)
          setShowPlayerDetails(false)
        }}
        onVisibleChange={(visible: boolean) => setShowPlayerDetails(visible)}
      >
        <p>
          Navigation with 2 dialogs showing user details and room details (copy
          room id to clipboard)
        </p>
        <div style={{ display: 'flex', background: 'lightgray' }}>
          <p>Player Details: </p>
          <pre>{JSON.stringify(currentPlayer, null, 2)}</pre>
        </div>
      </PapDialog>
      <PapDialog
        headerLabel={'Room Details'}
        visible={showRoomDetails}
        primaryButtonLabel={'Save'}
        onPrimaryButton={(data: any) => {
          console.log('primarybutton has been pressed')
          console.log('data comming back', data)
          setTimeout(() => {
            setShowRoomDetails(false)
          }, 2000)
        }}
        onSecondaryButton={(data: any) => {
          console.log('secondaryButton has been pressed')
          console.log('data comming back', data)
          setShowRoomDetails(false)
        }}
        onVisibleChange={(visible: boolean) => setShowRoomDetails(visible)}
      >
        <div style={{ display: 'flex', background: 'lightgray' }}>
          <div>
            <p>Room Details: </p>
            <pre>{JSON.stringify(room, null, 2)}</pre>
          </div>
        </div>
      </PapDialog>

      <PapToast toast={toast} />
    </div>
  )
}

export default RoomContainer
