import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { playerService } from '../../../services'
import { type Player } from '../../../models'

const PLAYER_FEATURE_KEY = 'player'

export interface PlayerState {
  loading: boolean
  loaded: boolean
  error?: Error
  player?: Player
}

const initialState: PlayerState = {
  loading: false,
  loaded: false
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMyPlayerById.pending, (state, _action) => {
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
    builder.addCase(removeMyPlayer.fulfilled, (state, _action) => {
      state.player = undefined // or can i just leave this out
      state.loading = false
      state.loaded = true
    })
  }
})

// thunks
const addPlayerToRoom = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/addPlayerToRoom`,
  async ({ roomId, name }: { roomId: string; name: string }, _thunkAPI) => {
    return await playerService.addPlayerToRoom(roomId, name)
  }
)
export const getMyPlayerById = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/getMyPlayerById`,
  async ({ roomId, playerId }: { roomId: string; playerId: string }, _thunkAPI) => {
    // todo: should get these values from state and nto local storage
    // const { roomId, myUserId: myPlayerId } = PapelitoLocalStorage.getRoomAndPlayerId()
    return await playerService.getPlayerById(roomId, playerId)
  }
)
export const getPlayerById = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/getPlayerById`,
  async ({ roomId, playerId }: { roomId: string; playerId: string }, _thunkAPI) => {
    return await playerService.getPlayerById(roomId, playerId)
  }
)
export const markPlayerSubmittedPapelitos = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/updatePlayerById`,
  async ({ roomId, playerId }: { roomId: string; playerId: string }, _thunkAPI) => {
    await playerService.markPlayerSubmittedPapelitos(roomId, playerId)
  }
)
export const removePlayerById = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/removePlayerById`,
  async (data: { roomId: string; playerId: string }, _thunkAPI) => {
    await playerService.removePlayerById(data.roomId, data.playerId)
  }
)
export const grantAdminRole = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/grantAdminRole`,
  async (data: { roomId: string; playerId: string }, _thunkAPI) => {
    await playerService.grantAdminRole(data.roomId, data.playerId)
  }
)
export const removeAdminRole = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/grantAdminRole`,
  async (data: { roomId: string; playerId: string }, _thunkAPI) => {
    await playerService.removeAdminRole(data.roomId, data.playerId)
  }
)

export const removeMyPlayer = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/removeMyPlayer`,
  async ({ roomId, playerId }: { roomId: string; playerId: string }, _thunkAPI) => {
    // todo: should get these values from state and nto local storage
    // const { roomId, myUserId: myPlayerId } = PapelitoLocalStorage.getRoomAndPlayerId()
    await playerService.removePlayerById(roomId, playerId)
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
