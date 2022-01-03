import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Papelito } from 'papelito-models'

const PAPELITO_FEATURE_KEY: string = 'papelito'

export interface PapelitoState {
  myPapelitos: Papelito[]
}

const initialState: PapelitoState = { myPapelitos: [] }

export const papelitoSlice = createSlice({
  name: PAPELITO_FEATURE_KEY,
  initialState,
  reducers: {
    addToMyPapelitos: (state, action: PayloadAction<Papelito>) => {
      console.log('this is the reducer', action.payload)
      state.myPapelitos = state.myPapelitos?.concat(action.payload)
    },
    removeFromMyPapelitos: (state, action: PayloadAction<string>) => {
      state.myPapelitos = state.myPapelitos?.filter(
        (p) => p.id === action.payload
      )
    },
  },
})

export const {} = papelitoSlice.actions

export default papelitoSlice.reducer
