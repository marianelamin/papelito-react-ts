import { PapelitoLocalStorage } from '../../local-storage'
import { isUserValidInRoom } from '../../services/user.service'

export const attemptToGetPlayerAndRoomDetails = async () => {
  const { roomId, myUserId } = PapelitoLocalStorage.getRoomAndPlayerId()
  console.info('- useAuth hook -\n\n', `roomId: ${roomId}, myPlayerId: ${myUserId}`)

  if (roomId && myUserId) {
    try {
      // todo: fix the data being stored in redux store. after reload and verify user
      await isUserValidInRoom(roomId, myUserId)
      return true
    } catch (err) {
      console.error(err)
    }
  } else {
    console.log({ roomId, myUserId })
  }
  return false
}
