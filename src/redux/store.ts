import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import papelitoReducer from 'redux/reducers/papelito/papelitoSlice'
import bowlReducer from 'redux/reducers/bowl/bowlSlice'
import teamsReducer from 'redux/reducers/teams/teamsSlice'
import roomReducer from 'redux/reducers/room/roomSlice'

const rootReducer = combineReducers({
  room: roomReducer,
  currentPapelito: papelitoReducer,
  // currentPlayer: papelitoReducer,
  bowl: bowlReducer,
  // guessedPapelitos: papelitoReducer,
  teams: teamsReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store
