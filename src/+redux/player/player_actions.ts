// GET_ALL_PLAYERS,
// GET_PLAYER,
// ADD_PLAYER,
// REMOVE_PLAYER,
import { GameActions, Action } from '+redux/enum_actions'
// import { Player } from 'ui/models/all_models'

export const getAllPlayers = (roomId: string): Action<string> => ({
  type: GameActions.GET_ALL_PLAYERS,
  payload: roomId,
})
