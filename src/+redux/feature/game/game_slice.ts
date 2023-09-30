import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const GAME_FEATURE_KEY: string = 'game'

export interface GameState {
  loaded: boolean
  loading: boolean
  isGameStarted: boolean
}

const initialState: GameState = {
  loaded: false,
  loading: false,
  isGameStarted: false,
}

export const gameSlice = createSlice({
  name: GAME_FEATURE_KEY,
  initialState,
  reducers: {
    setGameSettings: () => {},
    startGame: () => {},
  },
})

export const { startGame, setGameSettings } = gameSlice.actions

export default gameSlice.reducer
