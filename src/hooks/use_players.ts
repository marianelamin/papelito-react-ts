import { useEffect, useState } from 'react'

import { Player } from 'papelito-models'
import { onSnapshot } from 'dao'

import { playersRef } from 'dao/collection_references'
import { useAppDispatch } from '+redux/store'
import { teamsSlice } from '+redux/feature/team/team_slice'
import { playerSlice } from '+redux/feature/player/player_slice'

export const usePlayer = (roomId: string, playerId: string) => {
  // const appDispatch = useAppDispatch()
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
        console.log(`Received doc snapshot for all players: `, document)

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
      (error) => console.error('aqui esta el error pues: \n', error),
      () => {
        console.info('Finished!!!')
      }
    )

    return () => {
      unsubscribe()
    }
  }, [roomId, isFetching])

  return { currentPlayer, isFetching, allPlayers }
}
