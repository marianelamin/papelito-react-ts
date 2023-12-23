import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type AppDispatch, type RootState } from 'store-redux/store'
import { teamService } from 'services'
import { type Player, type Team } from 'papelito-models'

const TEAMS_FEATURE_KEY: string = 'teams'

export interface TeamsState {
  loaded: boolean
  loading: boolean
  error?: Error
  allPlayers: Player[]
  allTeams: Team[]
  currentTeamId?: string
}

const initialState: TeamsState = {
  loading: false,
  loaded: false,
  allTeams: [],
  allPlayers: []
}

export const teamsSlice = createSlice({
  name: TEAMS_FEATURE_KEY,
  initialState,
  reducers: {
    setCurrentTeamId: (state, action: PayloadAction<string>) => {
      state.currentTeamId = action.payload
    },
    setAllTeams: (state, action: PayloadAction<Team[]>) => {
      state.allTeams = action.payload
    },
    setAllPlayers: (state, action: PayloadAction<Player[]>) => {
      state.allPlayers = action.payload
    },
    addPlayerToTeam: (state, action: PayloadAction<any>) => {
      const teamId: string = action.payload.teamId
      const player: Player = action.payload.player

      state.allTeams.forEach((team) => {
        if (team.id == teamId) {
          team.players.push(player)
        }
      })
    },
    removePlayerFromTeam: (state, action) => {
      // nice to have feature
      state.allTeams = action.payload
    },
    incrementScoreOnTeam: (state, action: PayloadAction<Team>) => {
      state.allTeams = state.allTeams.map((team) => {
        if (state.currentTeamId == team.id) {
          team.score += 1
        }
        return team
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllPlayers.fulfilled, (state, action) => {
      state.loaded = true
      console.log('extra reducers action payload', action.payload)
    })
  }
})

export const fetchAllPlayers = createAsyncThunk<
void,
void,
{
  dispatch: AppDispatch
  state: RootState
}
>(`${TEAMS_FEATURE_KEY}/fetchAllPlayers`, async (data, thunkApi) => {
  // ✅ Now we can use the text value and send it to the server
  const state: RootState = thunkApi.getState()
  console.log('Peeking at state before:', state)
  const players: Player[] = [] // await teamsService.getAllPlayers(state.room.roomId)
  thunkApi.dispatch(teamsSlice.actions.setAllPlayers(players))
  console.log('Peeking at state after:', state)
})

export const {} = teamsSlice.actions

export default teamsSlice.reducer
