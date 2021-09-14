import { useEffect, useState } from 'react'

import { Papelito, Player, Team, Room } from 'ui/models/all_models'
import { db } from 'services'

const useRoom = (roomId: string) => {
  const [room, setRoom] = useState<Room>()
  const [isFetching, setIsFetching] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = db
      .collection('gameRooms')
      .doc(roomId)
      .onSnapshot((doc) => {
        console.log(`Received doc snapshot: ${doc}`)
        let newRoomRaw = { ...doc.data(), id: doc.id }
        newRoomRaw['id'] = roomId

        console.log(newRoomRaw)
        if (doc.exists) console.log('here is the coom' + newRoomRaw)
        // setRoom(newRoomRaw)
        // else console.log('Room Not Found')
        // if (isFetching) setIsFetching(false)
      })

    return () => {
      unsubscribe()
    }
  }, [roomId, isFetching])

  return { isFetching, room }
}

export { useRoom }
