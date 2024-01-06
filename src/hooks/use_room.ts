import { useEffect, useState } from 'react'
import { doc, onSnapshot } from '../dao'
import { roomRef } from '../dao/collection_references'
import { roomSlice } from '../store-redux/feature/room/room_slice'
import { useAppDispatch } from '../store-redux/store'
import { useUser } from '../utilities/context/userContext'

export const useRoom = () => {
  const { roomId } = useUser()

  const appDispatch = useAppDispatch()
  const [isFetching, setIsFetching] = useState<boolean>(true)

  useEffect(() => {
    console.info(`- room hook -\n\n roomId: ${roomId}`)

    if (roomId) {
      const unsubscribe = onSnapshot(
        doc(roomRef(), roomId),
        async (document) => {
          console.log('Room Changes: ', document.id, document.data())

          const r = document.data()?.toRoom()
          if (r) {
            appDispatch(roomSlice.actions.setRoom(r))
            setIsFetching(false)
          }
        },
        (error: Error) => {
          console.error('aqui esta el error pues: \n', { error })
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
  }, [roomId, isFetching])

  return { isFetching }
}
