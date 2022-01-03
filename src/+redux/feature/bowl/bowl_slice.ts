import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from '+redux/store'
import Papelito from 'papelito-models/papelito'
import * as papelitoService from 'services/papelito_service'

const BOWL_FEATURE_KEY: string = 'bowl'

export interface BowlState {
  guessed: Papelito[]
  bowl: Papelito[]
  currentPapelito?: Papelito
  loaded: boolean
  loading: boolean
  error?: Error
}

const initialState: BowlState = {
  loaded: false,
  loading: false,
  bowl: [],
  guessed: [],
}

export const bowlSlice = createSlice({
  name: BOWL_FEATURE_KEY,
  initialState,
  reducers: {
    setBowl: (state, action: PayloadAction<Papelito[]>) => {
      state.bowl = action.payload.filter((p) => !p.guessed)
      state.guessed = action.payload.filter((p) => p.guessed)
    },
    setCurrentPapelito: (state, action: PayloadAction<Papelito>) => {
      // call service to mark a papelito as drawn (not in bowl)
      state.currentPapelito = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToBowl.fulfilled, (state, action) => {})
    builder.addCase(getBowl.fulfilled, (state, action) => {})
    builder.addCase(drawOnePapelito.fulfilled, (state, action) => {})
    builder.addCase(putBackPapelito.fulfilled, (state, action) => {})
    builder.addCase(disputePapelito.fulfilled, (state, action) => {})
  },
})

// thunk

export const addToBowl = createAsyncThunk<
  string,
  Papelito[],
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch
    state: RootState
  }
>(`${BOWL_FEATURE_KEY}/addToBowl`, async (data, thunkApi) => {
  let state: RootState = thunkApi.getState()
  console.log('peek state before:', state)
  let papAdded = await papelitoService.addToBowl(state.room.roomId, data)
  return ''
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
  let state: RootState = thunkApi.getState()
  console.log('peek state before:', state)
  let allPapelitos = await papelitoService.fetchAllPapelitos(state.room.roomId)
  thunkApi.dispatch(bowlSlice.actions.setBowl(allPapelitos))
  console.log('peek state before:', state)
  return ''
})

export const drawOnePapelito = createAsyncThunk<
  Papelito,
  void,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch
    state: RootState
  }
>(`${BOWL_FEATURE_KEY}/drawOnePapelito`, async (data, thunkApi) => {
  let state: RootState = thunkApi.getState()
  console.log('peek state before:', state)
  let drawnPapelito = await papelitoService.drawOnePapelito(state.room.roomId)
  return drawnPapelito
})

export const putBackPapelito = createAsyncThunk<
  string,
  string,
  {
    // Optional fields for defining thunkApi field types
    dispatch: AppDispatch
    state: RootState
  }
>(`${BOWL_FEATURE_KEY}/putBackPapelito`, async (data, thunkApi) => {
  let state: RootState = thunkApi.getState()
  console.log('peek state before:', state)
  let papPutBack = await papelitoService.putBackPapelito(
    state.room.roomId,
    data
  )
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
  let state: RootState = thunkApi.getState()
  console.log('peek state before:', state)
  let papDisputed = await papelitoService.disputePapelito(
    state.room.roomId,
    data
  )
  return ''
})

export const {} = bowlSlice.actions

export default bowlSlice.reducer
