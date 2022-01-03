import * as roomService from 'services/room_service'
import { RootState, AppDispatch } from '../../store'

// Write a synchronous outer function that receives the `text` parameter:
// export function getRoom(playerName: string) {
//   // And then creates and returns the async thunk function:
//   return async function getRoomThunk(
//     appDispatch: AppDispatch,
//     getState: RootState
//   ) {
//     // ✅ Now we can use the text value and send it to the server

//     const room = await roomService.createRoom(playerName)
//     console.log(`Peeking at state: ${getState.room.roomCode}`)
//     console.log(getState.room)
//     // appDispatch()
//   }
// }
