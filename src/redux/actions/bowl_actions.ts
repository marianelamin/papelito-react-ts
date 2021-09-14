// GET_ALL_PAPELITOS_IN_BOWL,
// DRAW_PAPELITO_FROM_BOWL,
// UNDRAW_PAPELITO_FROM_BOWL,
// GUESS_PAPELITO_FROM_BOWL,

import { Papelito } from 'ui/models/all_models'
import { PapelitoActions, Action } from 'redux/actions/enum_actions'

 const getAllPapelitosInBowlAction = (): Action => ({
  type: PapelitoActions.GET_ALL_PAPELITOS_IN_BOWL,
  payload: null,
})

 const guessPapelitoAction = (papelitoGuessed: Papelito): Action => ({
  type: PapelitoActions.GUESS_PAPELITO_FROM_BOWL,
  payload: papelitoGuessed,
})

 const drawPapelitoAction = (): Action => ({
  type: PapelitoActions.DRAW_PAPELITO_FROM_BOWL,
  payload: null,
})

 const unDrawPapelitoAction = (papelitoToUnDraw: Papelito): Action => ({
  type: PapelitoActions.UNDRAW_PAPELITO_FROM_BOWL,
  payload: papelitoToUnDraw,
})


export default {getAllPapelitosInBowlAction, guessPapelitoAction, drawPapelitoAction, unDrawPapelitoAction}