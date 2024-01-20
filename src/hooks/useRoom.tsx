import { useEffect, useState } from 'react'
import { roomRef, fs } from '../dao/collection_references'
import { roomSlice } from '../store-redux/feature/room/room_slice'
import { useAppDispatch } from '../store-redux/store'
import { useUser } from '../modules/core/user/context/UserContext'
import { Room } from '../models'

export const useRoom = () => {
  const { room: initialRoom } = useUser()

  const appDispatch = useAppDispatch()
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [room, setRoom] = useState<Room>(initialRoom!)

  useEffect(() => {
    console.info(`- room hook -\n\n roomId: ${initialRoom?.id}`)

    if (initialRoom?.id) {
      const unsubscribe = fs.onSnapshot(
        fs.doc(roomRef(), initialRoom?.id),
        async (document) => {
          console.log('Room Changes: ', document.id, document.data())

          const r = document.data()?.toRoom()
          if (r) {
            appDispatch(roomSlice.actions.setRoom(r))
            setRoom(r)
            setIsFetching(false)
          }
        },
        (error: Error) => {
          console.error({ error })
          appDispatch(roomSlice.actions.setRoomWithError(error))
        },
        () => {
          console.info('Finished!!!')
        }
      )

      return () => {
        unsubscribe()
      }
    }
  }, [initialRoom?.id, isFetching])

  return { isFetching, room }
}
