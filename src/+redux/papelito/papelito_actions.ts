import { Papelito } from 'papelito-models'
import { GameActions, Action } from '+redux/enum_actions'

export const getAllPapelitosAction = (): Action<any> => ({
  type: GameActions.GET_ALL_PAPELITOS,
})

export const addPapelitoAction = (
  papelitoToAdd: Papelito
): Action<Papelito> => ({
  type: GameActions.ADD_PAPELITO,
  payload: papelitoToAdd,
})

export const removePapelitoAction = (
  papelitoToRemove: Papelito
): Action<Papelito> => ({
  type: GameActions.REMOVE_PAPELITO,
  payload: papelitoToRemove,
})

export const throwPapelitoInBowlAction = (
  papelitoToBowl: Papelito
): Action<Papelito> => ({
  type: GameActions.THROW_PAPELITO_IN_BOWL,
  payload: papelitoToBowl,
})

const papelitoActions = {
  getAllPapelitosAction,
  addPapelitoAction,
  removePapelitoAction,
  throwPapelitoInBowlAction,
}

export default papelitoActions
