import { useCallback, useEffect, useState } from 'react'

import { type Player } from '../models'

import { onSnapshot } from '../dao'
import { playersRef } from '../dao/collection_references'
import { useUser } from '../modules/core/user/context/UserContext'
import { removePapelitosFromPlayerId } from '../dao/papelito.dao'
import { markPlayerForResubmission, grantAdminRole, removeAdminRole } from '../dao/player.dao'

export const usePlayer = () => {
  const { room, player } = useUser()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [allPlayers, setAllPlayer] = useState<Player[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<Player>()

  const resubmitPapelitos = useCallback(async () => {
    await removePapelitosFromPlayerId(room?.id!, currentPlayer?.id!)
    await markPlayerForResubmission(room?.id!, currentPlayer?.id!)
  }, [room?.id, currentPlayer?.id])

  useEffect(() => {
    if (!room?.id) {
      console.error('roomId not defined ', room?.id)
      return
    }

    const unsubscribe = onSnapshot(
      playersRef(room?.id),
      (document) => {
        const players: Player[] = []

        if (!document) console.error('Received doc snapshot for all players: ', document)

        document.forEach((d) => {
          const p = d.data().toPlayer(d.id)
          if (player?.id === p.id) {
            setCurrentPlayer(p)
          }
          players.push(p)
        })

        setAllPlayer(players)
        setIsLoading(false)
      },
      (error) => {
        console.error('aqui esta el error pues: \n', error)
      },
      () => {
        console.info('Finished!!!')
      }
    )

    return () => {
      unsubscribe()
    }
  }, [player?.id, room?.id])

  return {
    roomId: room?.id,
    currentPlayer,
    isLoading,
    allPlayers,
    resubmitPapelitos,
    grantAdminRole,
    removeAdminRole
  }
}
