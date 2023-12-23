import { useEffect, useState } from 'react'

import { type Player } from 'papelito-models'

import { onSnapshot } from 'dao'
import { playersRef } from 'dao/collection_references'
import { useUser } from 'utilities/context/userContext'

export const usePlayer = () => {
  const { roomId, userId: playerId } = useUser()

  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [allPlayers, setAllPlayer] = useState<Player[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<Player>()

  useEffect(() => {
    console.info('-\n\nThis is custom Player hook\n\n\n-', `roomId: ${roomId}`)

    if (!roomId) return

    const unsubscribe = onSnapshot(
      playersRef(roomId),
      (document) => {
        const players: Player[] = []
        console.log('Received doc snapshot for all players: ', document)

        document.forEach((d) => {
          const p = d.data().toPlayer()
          p.id = d.id
          console.log('leyendo cada uno de los players', p)
          console.log({ playerId, id: p.id })
          if (playerId === p.id) {
            setCurrentPlayer(p)
            // appDispatch(playerSlice.actions.setCurrentPlayer(p))
          }
          players.push(p)
        })

        setAllPlayer(players)
        // appDispatch(teamsSlice.actions.setAllPlayers(players))
        setIsFetching(false)
      },
      (error) => { console.error('aqui esta el error pues: \n', error) },
      () => {
        console.info('Finished!!!')
      }
    )

    return () => {
      unsubscribe()
    }
  }, [roomId, isFetching, playerId])

  return { roomId, currentPlayer, isFetching, allPlayers }
}
