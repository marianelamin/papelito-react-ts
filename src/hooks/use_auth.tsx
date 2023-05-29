import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { PapelitoLocalStorage } from '../localStorage'
import { RootState, useAppDispatch } from '+redux/store'
import { getMyPlayerById } from '+redux/feature/player/player_slice'
import { fetchRoomById } from '+redux/feature/room/room_slice'

export const useIsAuthenticated = () => {
  const appDispatch = useAppDispatch()

  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => !!state.currentPlayer.player && !!state.room.room
  )

  useEffect(() => {
    const { roomId, myUserId: myPlayerId } =
      PapelitoLocalStorage.getRoomAndPlayerId()

    if (!roomId || !myPlayerId) {
      // todo: potentially clear local storage here
      // PapelitoLocalStorage.getRoomAndPlayerId()
      return
    }

    console.info(
      '- useAuth hook -\n\n',
      `roomId: ${roomId}, myPlayerId: ${myPlayerId}`
    )
    appDispatch(fetchRoomById(roomId))
    appDispatch(getMyPlayerById())
    return () => {}
  }, [])

  return { isAuthenticated }
}
