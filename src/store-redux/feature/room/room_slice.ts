import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { type Room } from '../../../papelito-models'
import { type AppDispatch, type RootState } from '../../store'
import { roomService, gameService } from '../../../services'

export interface RoomState {
  loading: boolean
  loaded: boolean
  room?: Room
  error?: Error
}

const initialRoomState: RoomState = {
  loading: false,
  loaded: false
}

const ROOM_FEATURE_KEY: string = 'room'

export const roomSlice = createSlice({
  name: ROOM_FEATURE_KEY,
  initialState: initialRoomState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room>) => {
      state.room = action.payload
      state.loading = false
      state.loaded = true
    },
    setRoomWithError: (state, action: PayloadAction<Error>) => {
      state.loading = false
      state.loaded = false
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomById.pending, (state, _action) => {
      state.loading = true
      state.loaded = false
    })
    builder.addCase(fetchRoomById.fulfilled, (state, action) => {
      state.room = action.payload
      state.loading = false
      state.loaded = true
    })

    builder.addCase(fetchRoomById.rejected, (state, action) => {
      state.error = new Error(`${action.payload}`)
      state.loading = false
      state.loaded = true
    })
    builder.addCase(createJustRoom.fulfilled, (state, action) => {
      state.room = action.payload
      state.loading = false
      state.loaded = true
    })
  }
})

// thunks
export const fetchRoomById = createAsyncThunk(
  `${ROOM_FEATURE_KEY}/fetchRoomById`,
  async (id: string) => {
    return await roomService.getRoomById(id)
  }
)
export const createJustRoom = createAsyncThunk(`${ROOM_FEATURE_KEY}/createJustRoom`, async () => {
  return await roomService.createJustRoom()
})
export const exitRoom = createAsyncThunk<void, void, { dispatch: AppDispatch; state: RootState }>(
  `${ROOM_FEATURE_KEY}/exitRoom`,
  async (_data, { getState }) => {
    const state: RootState = getState()

    await gameService.exitRoom(state.room.room?.id ?? '', state.currentPlayer.player?.id ?? '')
  }
)

export function getRoomTh() {
  // And then creates and returns the async thunk function:
  return async function getRoomThunk(appDispatch: AppDispatch, getState: Function) {
    // ✅ Now we can use the text value and send it to the server
    const state = getState()
    console.log('Peeking at state before:', state)
    const room: Room = await roomService.createJustRoom()
    console.log('Peeking at state after:', state)
    appDispatch(roomSlice.actions.setRoom(room))
  }
}

export const { setRoom } = roomSlice.actions

export default roomSlice.reducer
