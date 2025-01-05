import { type Player } from '../../../../models'
import { DataView, PapButton, Tooltip } from '../../../../ui/components/common'
import { usePlayer } from '../../../../hooks'
import { getColor } from '../../../../helpers'
import { ReactNode, useCallback, useMemo } from 'react'
import {
  removeAdminRole,
  grantAdminRole,
  removePlayerById
} from '../../../../store-redux/feature/player/player_slice'
import { useAppDispatch } from '../../../../store-redux/store'
import { Button } from 'primereact/button'

export const Players = (): ReactNode => {
  const { allPlayers, roomId, currentPlayer } = usePlayer()
  const appDispatch = useAppDispatch()

  const adminPlayersCount = useMemo(() => allPlayers.filter((p) => p.isAdmin).length, [allPlayers])

  const removePlayer = useCallback(
    (player: Player) => async () => {
      alert(
        `TODO: create a dialog for this\n\nYou are removing this player... if this is a mistake the player will have to re join the room, just need to provide the room code:\n\nRoom Code: ${roomId}`
      )
      if (roomId) await appDispatch(removePlayerById({ roomId, playerId: player.id })).unwrap()
      else console.error('Weird: room ID is not set', roomId)
    },
    [appDispatch, roomId]
  )

  const handleGrantAdminRole = useCallback(
    (player: Player) => async () => {
      if (roomId) await appDispatch(grantAdminRole({ roomId, playerId: player.id })).unwrap()
      else console.error('Weird: room ID is not set', roomId)
    },
    [appDispatch, roomId]
  )

  const handleRemoveAdminRole = useCallback(
    (player: Player) => async () => {
      if (roomId) await appDispatch(removeAdminRole({ roomId, playerId: player.id })).unwrap()
      else console.error('Weird: room ID is not set', roomId)
    },
    [appDispatch, roomId]
  )

  const playerTemplate = (item: Player): ReactNode => {
    return (
      <div className="col-12">
        <div className="flex flex-column flex-1 gap-1">
          <div className="flex flex-1 align-items-center gap-2">
            <i className="pi pi-user" style={{ color: getColor(item.colorNumber) }} />

            <span className="font-bold">{item.name}</span>
            {item.id === currentPlayer?.id && <small>(me)</small>}

            {item.hasSubmittedPapelitos ? (
              <div>
                <Tooltip
                  target=".submitted-papelitos-warning"
                  content={'Papelitos submitted'}
                  position={'top'}
                />
                <i
                  className={'submitted-papelitos-warning pi pi-file'}
                  style={{ color: 'green' }}
                />
              </div>
            ) : (
              <div>
                <Tooltip
                  target=".need-enter-papelitos-warning"
                  content={'Need to enter papelitos'}
                  position={'top'}
                />
                <i
                  className={'need-enter-papelitos-warning pi pi-exclamation-circle'}
                  style={{ color: 'orange' }}
                />
              </div>
            )}
            {item.isAdmin && <small className="font-italic">(Admin)</small>}

            {/* <Tooltip target=".player-internet-connection" content="Online" position={'top'} />
            <i className="player-internet-connection pi pi-wifi" style={{ color: 'green' }}></i> */}
          </div>

          <p>order: #{item.order}</p>

          {/* <div className="flex align-items-center gap-2"> */}
          <p>team: {item.teamId}</p>
          {/* </div> */}
          <p>submitted: {item.hasSubmittedPapelitos ? 'yes' : 'no'}</p>
          {currentPlayer?.isAdmin && (
            <div style={{ display: 'flex', justifyContent: 'end', border: '#fff4f7 1px solid' }}>
              {!item.isAdmin ? (
                <Button link onClick={handleGrantAdminRole(item)}>
                  Grant Admin
                </Button>
              ) : (
                adminPlayersCount > 1 && (
                  <Button link onClick={handleRemoveAdminRole(item)}>
                    Remove Admin Role
                  </Button>
                )
              )}
              <Tooltip
                target=".player-erase-trash-action"
                content="Erase player"
                position={'top'}
              />
              <PapButton
                className="player-erase-trash-action"
                link
                icon="pi pi-trash"
                onClick={removePlayer(item)}
              />
            </div>
          )}
        </div>
        <hr />
      </div>
    )
  }

  return <DataView value={allPlayers} itemTemplate={playerTemplate} header="Players" />
}
