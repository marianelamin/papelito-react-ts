import { useEffect, useState } from 'react'

import { Papelito, Player, Team, Room } from 'papelito-models'
import { doc, onSnapshot } from 'dao'
import { roomRef } from 'dao/collection_references'
import { roomSlice } from '+redux/feature/room/room_slice'
import { useAppDispatch } from '+redux/store'
import PapelitoLocalStorage from 'localStorage'

export const useRoom = (i?: string) => {
  const roomId = PapelitoLocalStorage.getRoomId()
  const appDispatch = useAppDispatch()
  const [isFetching, setIsFetching] = useState<boolean>(true)

  useEffect(() => {
    console.info(`- room hook -\n\n roomId: ${roomId}`)

    if (roomId) {
      const unsubscribe = onSnapshot(
        doc(roomRef(), roomId),
        (document) => {
          console.log(`Room Changes: `, document.id, document.data())

          let r = document.data()?.toRoom()
          if (r) {
            appDispatch(roomSlice.actions.setRoom(r))
            setIsFetching(false)
          }
        },
        (error: Error) => {
          console.error('aqui esta el error pues: \n', error)
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
