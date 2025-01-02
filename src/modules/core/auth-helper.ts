import { PapelitoLocalStorage } from '../../local-storage'
import { isUserValidInRoom } from '../../services/user.service'

export const attemptToGetPlayerAndRoomDetails = async () => {
  const { roomId, myUserId } = PapelitoLocalStorage.getRoomAndPlayerId()
  console.info('- useAuth hook -\n\n', `roomId: ${roomId}, myPlayerId: ${myUserId}`)

  if (roomId && myUserId) {
    try {
      // john is super cool
      // todo: fix the data being stored in redux store. after reload and verify user
      const player = await isUserValidInRoom(roomId, myUserId)
      console.log(player)
      return player
    } catch (err) {
      console.error(err)
    }
  } else {
    console.log({ roomId, myUserId })
  }
  return false
}
