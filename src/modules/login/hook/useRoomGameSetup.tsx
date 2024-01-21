import { useCallback } from 'react'
import { roomService } from '../../../services'
import { PapelitoLocalStorage } from '../../../local-storage'
import { useAppDispatch } from '../../../store-redux/store'
import { roomSlice } from '../../../store-redux/feature/room/room_slice'
import { playerSlice } from '../../../store-redux/feature/player/player_slice'

export const useRoomGameSetup = () => {
  const appDispatch = useAppDispatch()

  const createRoomAndSetup = useCallback(
    async (playerName: string) => {
      const res = await roomService.createRoomAndSetup(playerName)

      appDispatch(roomSlice.actions.setRoom(res.room))
      appDispatch(playerSlice.actions.setCurrentPlayer(res.player))

      PapelitoLocalStorage.setRoomId(res.room.id)
      PapelitoLocalStorage.setUserId(res.player.id)
    },
    [appDispatch]
  )

  const joinRoom = useCallback(
    async (roomId: string, playerName: string) => {
      const res = await roomService.joinRoom(roomId, playerName)

      appDispatch(roomSlice.actions.setRoom(res.room))
      appDispatch(playerSlice.actions.setCurrentPlayer(res.player))

      PapelitoLocalStorage.setRoomId(res.room.id)
      PapelitoLocalStorage.setUserId(res.player.id)
    },
    [appDispatch]
  )

  return { createRoomAndSetup, joinRoom }
}
