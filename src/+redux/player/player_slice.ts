import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    player: {},
  },
  reducers: {
    use: (state, action) => {
      // selects one from the bowl
      state = action.payload
    },
    dispute: (state, action) => {
      state.player = action.payload
    },
  },
})

export const { use, dispute } = playerSlice.actions

export default playerSlice.reducer
