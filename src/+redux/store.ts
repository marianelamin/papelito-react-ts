import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  papelitoReducer,
  bowlReducer,
  teamReducer,
  playerReducer,
  roomReducer,
} from './index'

const rootReducer = combineReducers({
  room: roomReducer.roomSlice.reducer,
  currentPlayer: playerReducer.playerSlice.reducer,
  papelito: papelitoReducer.papelitoSlice.reducer,
  bowl: bowlReducer.bowlSlice.reducer,
  teams: teamReducer.teamsSlice.reducer,
})

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store
