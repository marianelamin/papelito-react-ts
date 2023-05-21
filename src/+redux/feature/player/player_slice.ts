import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { playerService } from 'services'
import { Player } from 'papelito-models'
import PapelitoLocalStorage from 'localStorage'

const PLAYER_FEATURE_KEY = 'player'

export interface PlayerState {
  loading: boolean
  loaded: boolean
  error?: Error
  player?: Player
}

const initialState: PlayerState = {
  loading: false,
  loaded: false,
}

export const playerSlice = createSlice({
  name: PLAYER_FEATURE_KEY,
  initialState,
  reducers: {
    setCurrentPlayer: (state, action: PayloadAction<Player>) => {
      state.player = action.payload
      state.loading = false
      state.loaded = true
    },
    setPlayerWithError: (state, action: PayloadAction<Error>) => {
      state.loading = false
      state.loaded = false
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyPlayerById.pending, (state, action) => {
      state.loading = true
      state.loaded = false
    })
    builder.addCase(getMyPlayerById.fulfilled, (state, action) => {
      state.player = action.payload
      state.loading = false
      state.loaded = true
    })
    builder.addCase(getMyPlayerById.rejected, (state, action) => {
      state.loading = false
      state.loaded = true
      state.error = new Error(`${action.payload}`)
    })
    builder.addCase(addPlayerToRoom.fulfilled, (state, action) => {
      state.player = action.payload
      state.loading = false
      state.loaded = true
    })
    builder.addCase(removeMyPlayer.fulfilled, (state, action) => {
      state.player = undefined // or can i just leave this out
      state.loading = false
      state.loaded = true
    })
  },
})

// thunks
const addPlayerToRoom = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/addPlayerToRoom`,
  async (data: { roomId: string; playerName: string }, thunkAPI) => {
    return await playerService.addPlayerToRoom(data.roomId, data.playerName)
  }
)
export const getMyPlayerById = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/getMyPlayerById`,
  async (data: void, thunkAPI) => {
    // todo: should get these values from state and nto local storage
    const { roomId, myPlayerId } = PapelitoLocalStorage.getRoomAndPlayerId()
    return await playerService.getPlayerById(roomId, myPlayerId)
  }
)
export const getPlayerById = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/getPlayerById`,
  async (data: { roomId: string; playerId: string }, thunkAPI) => {
    return await playerService.getPlayerById(data.roomId, data.playerId)
  }
)
export const removePlayerById = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/removePlayerById`,
  async (data: { roomId: string; playerId: string }, thunkAPI) => {
    return await playerService.removePlayerById(data.roomId, data.playerId)
  }
)

export const removeMyPlayer = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/removeMyPlayer`,
  async (data: void, thunkAPI) => {
    // todo: should get these values from state and nto local storage
    const { roomId, myPlayerId } = PapelitoLocalStorage.getRoomAndPlayerId()
    return await playerService.removePlayerById(roomId, myPlayerId)
  }
)

// function addPlayerToRoomTh(playerName: string) {
//   // And then creates and returns the async thunk function:
//   return async function addPlayerToRoomThunk(
//     appDispatch: AppDispatch,
//     getState: Function
//   ) {
//     // ✅ Now we can use the text value and send it to the server
//     const state = getState()
//     console.log(`Peeking at state before:`, state)
//     const player: Player = await playerService.addPlayerToRoom(
//       state.room.id,
//       playerName
//     )
//     console.log(`Peeking at state after:`, state)
//     appDispatch(playerSlice.actions.setCurrentPlayer(player))
//   }
// }

export const { setCurrentPlayer } = playerSlice.actions

export default playerSlice.reducer
