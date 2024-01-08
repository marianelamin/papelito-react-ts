import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type Papelito } from '../../../models'

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
      state.myPapelitos = state.myPapelitos?.filter((p) => p.id !== action.payload)
    },
    clearMyPapelitos: (state) => {
      state.myPapelitos = []
    }
  }
})

export const { removeFromMyPapelitos } = papelitoSlice.actions

export default papelitoSlice.reducer
