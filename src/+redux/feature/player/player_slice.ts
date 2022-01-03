import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import * as playerService from 'services/player_service'
import { AppDispatch } from '+redux/store'
import { Player } from 'papelito-models'

const PLAYER_FEATURE_KEY = 'player'

export interface PlayerState {
  id: string
  name?: string
  activeInTurn?: boolean
  order?: number
  teamId?: string
  loading: boolean
  loaded: boolean
  error?: Error
}

const initialState: PlayerState = {
  loading: false,
  loaded: false,
  id: '-1',
}

export const playerSlice = createSlice({
  name: PLAYER_FEATURE_KEY,
  initialState,
  reducers: {
    getPlayer: (state, action: PayloadAction<string>) => {
      state.loading = true
      state.loaded = false
    },
    setCurrentPlayer: (state, action: PayloadAction<Player>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.order = action.payload.order
      state.activeInTurn = action.payload.activeInTurn
      state.teamId = action.payload.teamId
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
    builder.addCase(addPlayerToRoom.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.order = action.payload.order
      state.activeInTurn = action.payload.activeInTurn
      state.teamId = action.payload.teamId
      state.loading = false
      state.loaded = true
    })
    builder.addCase(getPlayerById.fulfilled, (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.order = action.payload.order
      state.activeInTurn = action.payload.activeInTurn
      state.teamId = action.payload.teamId
      state.loading = false
      state.loaded = true
    })
  },
})

// thunks
export const addPlayerToRoom = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/addPlayerToRoom`,
  async (data: { roomId: string; playerName: string }, thunkAPI) => {
    return await playerService.addPlayerToRoom(data.roomId, data.playerName)
  }
)
export const getPlayerById = createAsyncThunk(
  `${PLAYER_FEATURE_KEY}/getPlayerById`,
  async (data: { roomId: string; playerId: string }, thunkAPI) => {
    return await playerService.getPlayerInRoomById(data.roomId, data.playerId)
  }
)
export function addPlayerToRoomTh(playerName: string) {
  // And then creates and returns the async thunk function:
  return async function addPlayerToRoomThunk(
    appDispatch: AppDispatch,
    getState: Function
  ) {
    // ✅ Now we can use the text value and send it to the server
    const state = getState()
    console.log(`Peeking at state before:`, state)
    const player: Player = await playerService.addPlayerToRoom(
      state.room.id,
      playerName
    )
    console.log(`Peeking at state after:`, state)
    appDispatch(playerSlice.actions.setCurrentPlayer(player))
  }
}

export const { setCurrentPlayer } = playerSlice.actions

export default playerSlice.reducer
