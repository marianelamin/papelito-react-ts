import { type Player } from '../../../../models'
import { DataView, PapButton, Tooltip } from '../../../../ui/components/common'
import { usePlayer } from '../../../../hooks'
import { getColor } from '../../../../helpers'
import { ReactNode, useCallback } from 'react'
import { removePlayerById } from '../../../../store-redux/feature/player/player_slice'
import { useAppDispatch } from '../../../../store-redux/store'

export const Players = (): ReactNode => {
  const { allPlayers, roomId } = usePlayer()
  const appDispatch = useAppDispatch()

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

  const playerTemplate = (item: Player): ReactNode => {
    return (
      <div className="col-12">
        <div className="flex flex-column flex-1 gap-1">
          <div className="flex flex-1 align-items-center gap-2">
            <i className="pi pi-user" style={{ color: getColor(item.colorNumber) }} />

            <span className="font-bold">{item.name}</span>

            <Tooltip
              target=".enter-papelitos-warning"
              content={
                item.hasSubmittedPapelitos ? 'Papelitos submitted' : 'Need to enter papelitos'
              }
              position={'top'}
            />
            <i
              className={`enter-papelitos-warning pi ${
                item.hasSubmittedPapelitos ? 'pi-file' : 'pi-exclamation-circle'
              }`}
              style={{ color: item.hasSubmittedPapelitos ? 'green' : 'orange' }}
            />

            <Tooltip target=".player-internet-connection" content="Online" position={'top'} />
            <i className="player-internet-connection pi pi-wifi" style={{ color: 'green' }}></i>

            <Tooltip target=".player-erase-trash-action" content="Erase player" position={'top'} />
            <PapButton
              className="player-erase-trash-action"
              link
              icon="pi pi-trash"
              onClick={removePlayer(item)}
            />

            {item.isAdmin ? <span className="font-italic">[Admin]</span> : null}
          </div>
          <span>order: #{item.order}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>team: {item.teamId}</span>
          </div>
          <span>submitted: {item.hasSubmittedPapelitos ? 'yes' : 'no'}</span>
        </div>
        <hr />
      </div>
    )
  }

  return <DataView value={allPlayers} itemTemplate={playerTemplate} header="Players" />
}
