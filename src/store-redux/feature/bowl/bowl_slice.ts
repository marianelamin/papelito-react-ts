import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type RootState, type AppDispatch } from 'store-redux/store'
import { type Papelito } from 'papelito-models/papelito'
import { papelitoService } from 'services'

const BOWL_FEATURE_KEY: string = 'bowl'

export interface BowlState {
  loaded: boolean
  loading: boolean
  bowlSize: number
  guessedSize: number
  currentPapelito?: Papelito
  error?: Error
}

const initialState: BowlState = {
  loaded: false,
  loading: false,
  bowlSize: 0,
  guessedSize: 0
}

export const bowlSlice = createSlice({
  name: BOWL_FEATURE_KEY,
  initialState,
  reducers: {
    setBowl: (state, action: PayloadAction<Papelito[]>) => {
      state.bowlSize = action.payload.length // filter((p) => !p.guessed)
      state.guessedSize = action.payload.filter((p) => p.guessed).length
    },
    setCurrentPapelito: (state, action: PayloadAction<Papelito>) => {
      // call service to mark a papelito as drawn (not in bowl)
      state.currentPapelito = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addToBowl.pending, (state, action) => {
      state.loading = true
      state.loaded = false
    })
    builder.addCase(addToBowl.fulfilled, (state, action) => {
      state.bowlSize = state.bowlSize + action.payload.length
      state.loading = false
      state.loaded = true
    })
    builder.addCase(addToBowl.rejected, (state, action) => {
      state.error = new Error(`${action.payload}`)
      state.loading = false
      state.loaded = false
    })
    builder.addCase(getBowl.fulfilled, (state, action) => {})
    // builder.addCase(drawOnePapelito.fulfilled, (state, action) => {})
    builder.addCase(putBackPapelito.fulfilled, (state, action) => {})
    builder.addCase(disputePapelito.fulfilled, (state, action) => {})
  }
})

// thunk

export const addToBowl = createAsyncThunk<
Papelito[],
Papelito[],
{
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: RootState
}
>(`${BOWL_FEATURE_KEY}/addToBowl`, async (data, thunkApi) => {
  const state: RootState = thunkApi.getState()
  const id = state.room?.room?.id
  if (id) {
    try {
      const pap = await papelitoService.addToBowl(id, data)
      return pap
    } catch (error) {
      throw new Error('no added, error in pap service. addToBowl')
    }
  }
  throw new Error('no room id available')
})

export const getBowl = createAsyncThunk<
string,
Papelito[],
{
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: RootState
}
>(`${BOWL_FEATURE_KEY}/getBowl`, async (data, thunkApi) => {
  const state: RootState = thunkApi.getState()
  console.log('peek state before:', state)
  const id = state.room?.room?.id
  if (id) {
    const allPapelitos = await papelitoService.fetchAllPapelitos(id)
    thunkApi.dispatch(bowlSlice.actions.setBowl(allPapelitos))
    console.log('peek state before:', state)
  }
  return ''
})

// export const drawOnePapelito = createAsyncThunk<
//   Papelito,
//   void,
//   {
//     // Optional fields for defining thunkApi field types
//     dispatch: AppDispatch
//     state: RootState
//   }
// >(`${BOWL_FEATURE_KEY}/drawOnePapelito`, async (data, thunkApi) => {
//   let state: RootState = thunkApi.getState()
//   console.log('peek state before:', state)
//   let drawnPapelito = await papelitoService.drawOnePapelito(state.room.roomId)
//   return drawnPapelito
// })

export const putBackPapelito = createAsyncThunk<
string,
string,
{
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: RootState
}
>(`${BOWL_FEATURE_KEY}/putBackPapelito`, async (data, thunkApi) => {
  const state: RootState = thunkApi.getState()
  console.log('peek state before:', state)
  // let papPutBack = await papelitoService.putBackPapelito(
  //   state.room.roomId,
  //   data
  // )
  return ''
})

export const disputePapelito = createAsyncThunk<
string,
string,
{
  // Optional fields for defining thunkApi field types
  dispatch: AppDispatch
  state: RootState
}
>(`${BOWL_FEATURE_KEY}/disputePapelito`, async (data, thunkApi) => {
  const state: RootState = thunkApi.getState()
  console.log('peek state before:', state)
  // let papDisputed = await papelitoService.disputePapelito(
  //   state.room.roomId,
  //   data
  // )
  return ''
})

export const { setBowl, setCurrentPapelito } = bowlSlice.actions

export default bowlSlice.reducer
