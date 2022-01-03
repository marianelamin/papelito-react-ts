import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Room, Player, GameSettings, ActiveTurn } from 'papelito-models'
import { AppDispatch, RootState } from '+redux/store'
import * as roomService from 'services/room_service'

export interface RoomState {
  roomId: string
  roomCode: string
  settings?: GameSettings
  activeTurn?: ActiveTurn
  round?: number
  loading: boolean
  loaded: boolean
  error?: Error
}

const initialRoomState: RoomState = {
  roomId: '-1',
  roomCode: '-1',
  loading: false,
  loaded: false,
}
const ROOM_FEATURE_KEY: string = 'room'

export const roomSlice = createSlice({
  name: ROOM_FEATURE_KEY,
  initialState: initialRoomState,
  reducers: {
    createRoom: (state, action) => {
      state.loading = true
      state.loaded = false
    },
    setRoom: (state, action: PayloadAction<Room>) => {
      state.roomCode = action.payload.id
      state.roomId = action.payload.id
      state.round = action.payload.round
      state.settings = action.payload.settings
      state.activeTurn = action.payload.activeTurn
      state.loading = false
      state.loaded = true
    },
    getRoom: (state, action: PayloadAction<string>) => {
      state.loading = true
      state.loaded = false
    },
    setRoomWithError: (state, action: PayloadAction<Error>) => {
      state.loading = false
      state.loaded = false
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomById.fulfilled, (state, action) => {
      state.roomCode = action.payload.id
      state.roomId = action.payload.id
      state.round = action.payload.round
      state.settings = action.payload.settings
      state.activeTurn = action.payload.activeTurn
      state.loading = false
      state.loaded = true
    })
    builder.addCase(createJustRoom.fulfilled, (state, action) => {
      state.roomCode = action.payload.id
      state.roomId = action.payload.id
      state.round = action.payload.round
      state.settings = action.payload.settings
      state.activeTurn = action.payload.activeTurn
      state.loading = false
      state.loaded = true
    })
  },
})

// thunks
export const fetchRoomById = createAsyncThunk(
  `${ROOM_FEATURE_KEY}/fetchRoomById`,
  async (id: string, thunkAPI) => {
    return await roomService.getRoomById(id)
  }
)
export const createJustRoom = createAsyncThunk(
  `${ROOM_FEATURE_KEY}/createJustRoom`,
  async (thunkAPI) => {
    return await roomService.createJustRoom()
  }
)

export function getRoomTh() {
  // And then creates and returns the async thunk function:
  return async function getRoomThunk(
    appDispatch: AppDispatch,
    getState: Function
  ) {
    // ✅ Now we can use the text value and send it to the server
    const state = getState()
    console.log(`Peeking at state before:`, state)
    const room: Room = await roomService.createJustRoom()
    console.log(`Peeking at state after:`, state)
    appDispatch(roomSlice.actions.setRoom(room))
  }
}

export const { setRoom } = roomSlice.actions

export default roomSlice.reducer
