import { useEffect, useState } from 'react'

import { Papelito, Player, Team, Room } from 'ui/models/all_models'
import { db } from 'services'

const useRoom = (roomId: string) => {
  const [room, setRoom] = useState<Room | undefined>()
  const [isFetching, setIsFetching] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = db
      .collection('gameRooms')
      .doc(roomId)
      .onSnapshot((doc) => {
        let newRoom = { ...doc.data(), id: doc.id }
        console.log(newRoom)
        if (doc.exists) setRoom(newRoom as Room | any)
        else console.log('Room Not Found')
        if (isFetching) setIsFetching(false)
      })

    return () => {
      unsubscribe()
    }
  }, [roomId, isFetching])

  return { isFetching, room }
}

export { useRoom }
