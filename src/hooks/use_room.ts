import { useEffect, useState } from 'react'

import { Papelito, Player, Team, Room } from 'papelito-models'
import { db, doc, onSnapshot } from 'dao'

export const useRoom = (roomId: string) => {
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [room, setRoom] = useState<Room>()

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'gameRooms', roomId),
      (document: any) => {
        console.log(`Received doc snapshot: ${document}`)
        let newRoomRaw = { ...document.data(), id: document.id }
        newRoomRaw['id'] = roomId

        console.log(newRoomRaw)
        if (document.exists) console.log(`here is the room:  ${newRoomRaw}`)
        // setRoom(newRoomRaw)
        // else console.log('Room Not Found')
        // if (isFetching) setIsFetching(false)
      }
    )

    return () => {
      unsubscribe()
    }
  }, [roomId, isFetching])

  return { isFetching, room }
}
