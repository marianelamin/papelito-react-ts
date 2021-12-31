import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RoomState {
  roomId: number
  roomCode: string
}

const initialRoomState: RoomState = {
  roomId: 0,
  roomCode: 'AAAAA',
}

export const roomSlice = createSlice({
  name: 'room',
  initialState: initialRoomState,
  reducers: {
    setRoomId: (state, action: PayloadAction<RoomState>) => {
      state.roomId = action.payload.roomId
      state.roomCode = action.payload.roomCode
    },
  },
})

export const { setRoomId } = roomSlice.actions

export default roomSlice.reducer
