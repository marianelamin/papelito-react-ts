import { Player, defaultPlayer } from 'papelito-models'
import { DataView, PapButton, Tooltip } from './common'
import { usePlayer } from 'hooks'
import { getColor } from '../../helpers'
import { useCallback } from 'react'
import { removePlayerById } from '+redux/feature/player/player_slice'
import { useAppDispatch } from '+redux/store'

export const Players = (): JSX.Element => {
  const { currentPlayer, roomId } = usePlayer()
  const appDispatch = useAppDispatch()

  // todo: get this from a hook
  const players = [
    currentPlayer!,
    { ...defaultPlayer, id: 'test1', name: 'test1' },
    { ...defaultPlayer, id: 'test2', name: 'test2' },
  ].filter((p) => p !== undefined)

  const removePlayer = useCallback(
    (player: Player) => async () => {
      alert(
        `TODO: create a dialog for this\n\nYou are removing this player... if this is a mistake the player will have to re join the room, just need to provide the room code:\n\nRoom Code: ${roomId}`
      )
      await appDispatch(
        removePlayerById({ roomId, playerId: player.id })
      ).unwrap()
    },
    [appDispatch, roomId]
  )

  const playerTemplate = (item: Player): JSX.Element => {
    return (
      <div className="col-12">
        <div className="flex flex-column flex-1 gap-1 xl:mr-8">
          <div className="flex flex-1 align-items-center gap-2 xl:mr-8">
            <i
              className="pi pi-user "
              style={{ color: getColor(item.colorNumber) }}
            ></i>

            <span className="font-bold">{item.name}</span>

            {!item.hasSubmittedPapelitos && (
              <Tooltip
                target=".enter-papelitos-warning"
                content="Need to enter papelitos"
                position={'top'}
              />
            )}
            <i
              className={`enter-papelitos-warning pi ${
                item.hasSubmittedPapelitos
                  ? 'pi-circle-fill'
                  : 'pi-exclamation-circle'
              }`}
              style={{ color: item.hasSubmittedPapelitos ? 'green' : 'orange' }}
            ></i>

            <Tooltip
              target=".player-internet-connection"
              content="Online"
              position={'top'}
            />
            <i
              className="player-internet-connection pi pi-wifi"
              style={{ color: 'green' }}
            ></i>

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
          <span className="font-bold text-900">order: #{item.order}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>team: {item.teamId}</span>
          </div>
          <span>submitted: {item.hasSubmittedPapelitos ? 'yes' : 'no'}</span>
        </div>
      </div>
    )
  }

  return (
    <DataView value={players} itemTemplate={playerTemplate} header="Players" />
  )
}
