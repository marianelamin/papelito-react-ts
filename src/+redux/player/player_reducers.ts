import { GameActions, Action } from '../enum_actions'

export interface PlayerState {
  id: string
  name: string
}

const initialState: PlayerState = {
  id: '',
  name: '',
}

export const playerReducer = (
  state: PlayerState = initialState,
  action: Action<any>
) => {
  switch (action.type) {
    case GameActions.GET_ALL_PLAYERS: {
      return { ...state }
    }
    case GameActions.GET_PLAYER: {
      return { ...state }
    }
    case GameActions.ADD_PLAYER: {
      return { ...state }
    }
    case GameActions.REMOVE_PLAYER: {
      return { ...state }
    }
    default:
      return state
  }
}
