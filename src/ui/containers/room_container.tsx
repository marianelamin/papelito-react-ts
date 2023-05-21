import React, { FC, useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

/** @todo: make PapToolbar and PapToast */
import { Toolbar } from 'primereact/toolbar'
import { Toast } from 'primereact/toast'

import PapelitoLocalStorage from 'localStorage'

/** Redux imports */
import { RootState, useAppDispatch } from '+redux/store'
import {
  RoomState,
  roomSlice,
  fetchRoomById,
  exitRoom,
} from '+redux/feature/room/room_slice'
import * as papelitoSlice from '+redux/feature/papelito/papelito_slice'
import {
  playerSlice,
  removePlayerById,
  removeMyPlayer,
} from '+redux/feature/player/player_slice'
import * as bowlSlice from '+redux/feature/bowl/bowl_slice'

/** Hooks imports */
import { useRoom, usePlayer } from 'hooks'

/** Model imports */
import { Papelito, Player, Room, Team } from 'papelito-models'

/** UI Component/View imports */
import PapelitoWrapper from 'ui/views/papelito_game'
import {
  PapChart,
  PapDialog,
  PapSideBar,
  PapSpeedDial,
  PapToast,
  PapTooltip,
} from 'ui/components/common'
import { PlayerListComponent } from 'ui/components'
import { PapelitoListComponent } from 'ui/components/papelito_list'
import { AddPapelitoComponent } from 'ui/components/add_papelito'
import { PapelitosComponent } from 'ui/components/papelitos-component'

const RoomContainer: FC = () => {
  const roomId = PapelitoLocalStorage.getRoomId() ?? ''
  const playerId = PapelitoLocalStorage.getPlayerId() ?? ''

  /**
   * hooks
   */
  const navigate = useNavigate()
  const appDispatch = useAppDispatch()
  // to keep listening to changes inthe room document
  const {} = useRoom(roomId)

  const {
    isFetching: isFetchingAllPlayers,
    allPlayers,
    currentPlayer,
  } = usePlayer(roomId, playerId)
  const toast = useRef<Toast>(null)

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
  const [showPlayerDetails, setShowPlayerDetails] = useState<boolean>(false)
  const [showRoomDetails, setShowRoomDetails] = useState<boolean>(false)
  const [primaryButtonLoading, setPrimaryButtonLoading] =
    useState<boolean>(false)

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

  /**
   * arrow functions
   */
  // no api calls, only on redux state
  const saveNewPapelito = (papelitoToSave: Papelito) => {
    if (currentPlayer) papelitoToSave.author = currentPlayer
    console.log(papelitoToSave)
    appDispatch(
      papelitoSlice.papelitoSlice.actions.addToMyPapelitos(papelitoToSave)
    )
  }

  // no api calls, only on redux state
  function deletePapelito(papelitoToRemove: Papelito) {
    appDispatch(
      papelitoSlice.papelitoSlice.actions.removeFromMyPapelitos(
        papelitoToRemove.id
      )
    )
  }

  // this one will get papelitos written but not in bown yet, once they are in bowl owner ca no longer delete or edit.
  const throwPapelitoInBowl = async (papelitoToBowl: Papelito) => {
    console.log('sending', papelitoToBowl)
    await appDispatch(bowlSlice.addToBowl(papelitoToBowl))

    // @TODO: I should clear my papelitos only after they have
    // been successfully added to the bowl
    // appDispatch(papelitoSlice.papelitoSlice.actions.clearMyPapelitos())
  }

  const leaveRoom = async () => {
    await appDispatch(exitRoom())

    navigate('/home')
  }

  return (
    <div>
      {/* @todo: make this a pap component */}
      <div className="card">
        <div style={{ position: 'relative', height: '5rem' }}>
          <PapSpeedDial items={items}></PapSpeedDial>
        </div>
      </div>
      <Toolbar
        left={<h1>Room</h1>}
        right={
          <>
            <PapSideBar icon="pi-chart-bar" btnLabel="Stats">
              <h1>Stats</h1>

              {/* @todo: pass teams down as a prop */}
              <PapChart></PapChart>
              <ol>
                <li>adf</li>
                <li>adf</li>
              </ol>

              <h3>Current Team</h3>
            </PapSideBar>

            <div style={{ display: 'inline-block', padding: '1rem' }}></div>
            <PapSideBar icon="pi-user" btnLabel="Papelitos" position="right">
              <PapelitosComponent
                papelitoList={myPapelitoList}
                onDeleteItem={deletePapelito}
                onSendToBowl={throwPapelitoInBowl}
                onSavePapelito={saveNewPapelito}
              ></PapelitosComponent>
            </PapSideBar>
          </>
        }
      ></Toolbar>
      <br />

      <PlayerListComponent
        removePlayer={(player: Player) => {
          alert(
            `You are removing this player... if this is a mistake the player will have to re join the room, just need to provide the room code`
          )

          appDispatch(
            removePlayerById({ roomId: room?.id ?? '', playerId: player.id })
          )
        }}
        players={allPlayers}
        currentPlayer={currentPlayer}
      ></PlayerListComponent>
      <PapelitoWrapper currentPlayer={currentPlayer}></PapelitoWrapper>
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
