// GET_ALL_PLAYERS,
// GET_PLAYER,
// ADD_PLAYER,
// REMOVE_PLAYER,
import { PapelitoActions, Action } from 'redux/actions/enum_actions'
// import { Player } from 'ui/models/all_models'

export const getAllPlayers = (roomId: string): Action => ({
  type: PapelitoActions.GET_ALL_PLAYERS,
  payload: roomId,
})
