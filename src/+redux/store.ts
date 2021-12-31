import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'

import {
  papelitoReducer,
  bowlReducer,
  teamReducer,
  playerReducer,
  roomReducer,
} from './index'

const rootReducer = combineReducers({
  room: roomReducer.roomSlice.reducer,
  currentPapelito: papelitoReducer.papelitoSlice.reducer,
  currentPlayer: playerReducer.playerSlice.reducer,
  bowl: bowlReducer.bowlSlice.reducer,
  teams: teamReducer.teamsSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store
