import { PapelitoActions } from './enum_actions'
import { Papelito } from 'ui/models/all_models'

export type Action = { type: PapelitoActions; payload: any }

export const getAllPapelitosAction = (): Action => ({
  type: PapelitoActions.GET_ALL_PAPELITOS,
  payload: null,
})

export const addPapelitoAction = (papelitoToAdd: Papelito): Action => ({
  type: PapelitoActions.ADD_PAPELITO,
  payload: papelitoToAdd,
})

export const removePapelitoAction = (papelitoToRemove: Papelito): Action => ({
  type: PapelitoActions.REMOVE_PAPELITO,
  payload: papelitoToRemove,
})

export const throwPapelitoInBowlAction = (
  papelitoToBowl: Papelito
): Action => ({
  type: PapelitoActions.THROW_PAPELITO_IN_BOWL,
  payload: papelitoToBowl,
})

const papelitoActions = {
  getAllPapelitosAction, addPapelitoAction, removePapelitoAction, throwPapelitoInBowlAction
}

export default papelitoActions