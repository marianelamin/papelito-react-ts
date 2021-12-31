import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Papelito from 'papelito-models/papelito'

export const bowlSlice = createSlice({
  name: 'bowl',
  initialState: {
    guessed: [] as Papelito[],
    bowl: [] as Papelito[],
  },
  reducers: {
    addAll: (state, action: PayloadAction<Papelito[]>) => {
      // call service when game starts, lock bowl size
      state.bowl = state.bowl.concat(action.payload)
    },
    addOne: (state, action: PayloadAction<Papelito>) => {
      // call service when game starts, lock bowl size
      state.bowl = state.bowl.concat(action.payload)
    },
    drawOne: (state, action: PayloadAction<Papelito>) => {
      // call service to mark a papelito as drawn (not in bowl)
      state.bowl = state.bowl.filter(
        (papelito) => papelito.id != action.payload.id
      )
    },
    putBack: (state, action: PayloadAction<Papelito>) => {
      // call service
      state.bowl.push(action.payload)
    },
  },
})

export const { addAll, addOne, drawOne, putBack } = bowlSlice.actions

export default bowlSlice.reducer
