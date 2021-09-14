import { createSlice } from '@reduxjs/toolkit'

export const papelitoSlice = createSlice({
  name: 'papelito',
  initialState: {
    currentPapelito: {},
  },
  reducers: {
    use: (state, action) => {
      // selects one from the bowl
      state.currentPapelito = action.payload
    },
    dispute: (state, action) => {
      state.currentPapelito += action.payload
    },
  },
})

export const { use, dispute } = papelitoSlice.actions

export default papelitoSlice.reducer
