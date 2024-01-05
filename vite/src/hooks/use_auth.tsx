import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { PapelitoLocalStorage } from '../local-storage'
import { type RootState, useAppDispatch } from '../store-redux/store'
import { getMyPlayerById } from '../store-redux/feature/player/player_slice'
import { fetchRoomById } from '../store-redux/feature/room/room_slice'

export const useAuth = () => {
  const appDispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true)

  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => !!state.currentPlayer.player && !!state.room.room
  )

  useEffect(() => {
    const attemptToGetPlayerAndRoomDetails = async (roomId: string, playerId: string) => {
      setLoading(true)
      console.info('- useAuth hook -\n\n', `roomId: ${roomId}, myPlayerId: ${playerId}`)
      await Promise.allSettled([appDispatch(fetchRoomById(roomId)), appDispatch(getMyPlayerById())])
      setLoading(false)
    }

    const { roomId, myUserId: myPlayerId } = PapelitoLocalStorage.getRoomAndPlayerId()

    if (roomId && myPlayerId) {
      attemptToGetPlayerAndRoomDetails(roomId, myPlayerId)
    } else {
      PapelitoLocalStorage.getRoomAndPlayerId()
      setLoading(false)
    }

    return () => {}
  }, [appDispatch])

  return { isAuthenticated, loading }
}
