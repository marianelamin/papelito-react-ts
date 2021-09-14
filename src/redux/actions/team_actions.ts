// GET_ALL_TEAMS,
// ADD_TEAM,
// REMOVE_TEAM,
// ADD_PLAYER_TO_TEAM,
// REMOVE_PLAYER_FROM_TEAM,

import { PapelitoActions, Action } from 'redux/actions/enum_actions'
// import { Papelito } from 'ui/models/all_models'

export const getAllTeamsAction = (): Action => ({
  type: PapelitoActions.GET_ALL_TEAMS,
  payload: null,
})
