import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { PapelitoLocalStorage } from '../local-storage'
import { RootState, useAppDispatch } from '+redux/store'
import { getMyPlayerById } from '+redux/feature/player/player_slice'
import { fetchRoomById } from '+redux/feature/room/room_slice'

export const useAuth = () => {
  const appDispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true)

  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => !!state.currentPlayer.player && !!state.room.room
  )

  useEffect(() => {
    const attemptToGetPlayerAndRoomDetails = async (
      roomId: string,
      playerId: String
    ) => {
      setLoading(true)
      console.info(
        '- useAuth hook -\n\n',
        `roomId: ${roomId}, myPlayerId: ${playerId}`
      )
      await Promise.allSettled([
        appDispatch(fetchRoomById(roomId)),
        appDispatch(getMyPlayerById()),
      ])
      setLoading(false)
    }

    const { roomId, myUserId: myPlayerId } =
      PapelitoLocalStorage.getRoomAndPlayerId()

    if (roomId && myPlayerId) {
      attemptToGetPlayerAndRoomDetails(roomId, myPlayerId)
    } else {
      // todo: potentially clear local storage here
      // PapelitoLocalStorage.getRoomAndPlayerId()
    }

    return () => {}
  }, [])

  return { isAuthenticated, loading }
}
