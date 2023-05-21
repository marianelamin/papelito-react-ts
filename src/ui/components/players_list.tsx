import { useState } from 'react'
import { Player } from 'papelito-models'
import { getColor } from '../../helpers'
import { PapButton } from './common'

interface PlayerListComponentIO {
  players: Player[]
  currentPlayer: Player | undefined
  removePlayer: (player: Player) => void
}

const PlayerListComponent = (props: PlayerListComponentIO) => {
  const { players, currentPlayer, removePlayer } = props

  return (
    <div>
      <h2>Players in Room</h2>
      <ol>
        {players
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
