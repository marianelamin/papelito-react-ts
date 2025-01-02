import { PapelitoLocalStorage } from '../../../../local-storage'
import { type ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { Room, Player } from '../../../../models'
import { useAppDispatch } from '../../../../store-redux/store'
import { roomSlice } from '../../../../store-redux/feature/room/room_slice'
import { PlayerState, playerSlice } from '../../../../store-redux/feature/player/player_slice'
import { playerService, roomService } from '../../../../services'
import { useSelector } from 'react-redux'

interface UserState {
  room?: Room
  player?: Player
}

export const UserContext = createContext<UserState | undefined>(undefined)
UserContext.displayName = 'UserContext'

export function UserContextProvider({ children }: { children: ReactNode }): ReactNode {
  const [player, setPlayer] = useState<Player>()
  const [room, setRoom] = useState<Room>()
  const appDispatch = useAppDispatch()
  const playerInStore = useSelector<PlayerState>((state) => state.player)

  useEffect(() => {
    const roomId = PapelitoLocalStorage.getRoomId()
    const userId = PapelitoLocalStorage.getUserId()

    if (roomId && userId) {
      roomService.getRoomById(roomId).then((response) => {
        setRoom(response)
        !playerInStore && appDispatch(roomSlice.actions.setRoom(response))
      })
      playerService.getPlayerById(roomId, userId).then((response) => {
        setPlayer(response)
        !playerInStore && appDispatch(playerSlice.actions.setCurrentPlayer(response))
      })
    }
  }, [])

  return <UserContext.Provider value={{ room, player }}>{children}</UserContext.Provider>
}

export function useUser(): UserState {
  const context = useContext(UserContext)
  if (context == null) {
    throw new Error('useUser debe ser usado dentro de UserContextProvider')
  }

  return context
}
