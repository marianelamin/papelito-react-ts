import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'

import thunk from 'redux-thunk'

import {
  papelitoReducer,
  playerReducer,
  teamReducer,
  roomReducer,
  bowlReducer,
  // gameReducer,
} from './index'

const rootReducer = combineReducers({
  room: roomReducer.roomSlice.reducer, // myRoomDetails
  currentPlayer: playerReducer.playerSlice.reducer, // myPlayerDetails
  papelito: papelitoReducer.papelitoSlice.reducer, // myPapelitosDetails
  teams: teamReducer.teamsSlice.reducer, // myTeamDetails
  // allPlayers: teamReducer.teamsSlice.reducer, // allPlayers
  bowl: bowlReducer.bowlSlice.reducer, // bowlDetails
  // activeTurn: turnsReducer.turnSlice.reducer, // shoudl contain active
  // gamestats:
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
