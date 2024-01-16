import { useEffect, useState } from 'react'

import { type Player } from '../models'

import { onSnapshot } from '../dao'
import { playersRef } from '../dao/collection_references'
import { useUser } from '../utilities/context/userContext'

export const usePlayer = () => {
  const { room, player } = useUser()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [allPlayers, setAllPlayer] = useState<Player[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<Player>()

  useEffect(() => {
    console.info('-\n\nThis is custom Player hook\n\n\n-', `roomId: ${room?.id}`)

    if (!room?.id) return

    const unsubscribe = onSnapshot(
      playersRef(room?.id),
      (document) => {
        const players: Player[] = []
        console.log('Received doc snapshot for all players: ', document)

        document.forEach((d) => {
          const p = d.data().toPlayer()
          p.id = d.id
          console.log('leyendo cada uno de los players', p)
          console.log({ playerID: player?.id, id: p.id })
          if (player?.id === p.id) {
            setCurrentPlayer(p)
            // appDispatch(playerSlice.actions.setCurrentPlayer(p))
          }
          players.push(p)
        })

        setAllPlayer(players)
        // appDispatch(teamsSlice.actions.setAllPlayers(players))
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
  }, [player?.id, isLoading, room?.id])

  return { roomId: room?.id, currentPlayer, isLoading, allPlayers }
}
