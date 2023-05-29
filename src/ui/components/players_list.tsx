import { Player } from 'papelito-models'
import { getColor } from '../../helpers'
import { PapButton } from './common'
import { useAppDispatch } from '+redux/store'
import { usePlayer } from 'hooks'
import { removePlayerById } from '+redux/feature/player/player_slice'
import { useUser } from 'utilities/context/userContext'

const PlayerListComponent = () => {
  const appDispatch = useAppDispatch()
  const { roomId, userId: playerId } = useUser()

  const { allPlayers, currentPlayer } = usePlayer(roomId, playerId)

  const removePlayer = (player: Player) => {
    alert(
      `You are removing this player... if this is a mistake the player will have to re join the room, just need to provide the room code`
    )
    appDispatch(removePlayerById({ roomId, playerId }))
  }

  return (
    <div>
      <h2>Players in Room</h2>
      <ol>
        {allPlayers
          .filter((p) => p.id !== currentPlayer?.id)
          .map((player, index) => (
            <li key={player.id}>
              <div>
                <i
                  className="pi pi-user"
                  style={{ color: getColor(index), padding: '0px 10px' }}
                ></i>
                {player.name} (Order: {player.order}, team ID: - {player.teamId}
                )
                <PapButton
                  icon="pi pi-trash"
                  onClick={() => removePlayer(player)}
                ></PapButton>
              </div>
            </li>
          ))}
      </ol>
    </div>
  )
}

export { PlayerListComponent }
