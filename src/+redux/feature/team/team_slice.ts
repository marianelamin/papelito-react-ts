import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Player from 'papelito-models/player'
import Team from 'papelito-models/team'

const players = [
  new Player('Marianela'),
  new Player('Majana'),
  new Player('Juan Carlos'),
  new Player('Jorge Marin'),
]

const currentTeam = new Team()
currentTeam.id = '23'
currentTeam.name = 'A'
currentTeam.players = players

export const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    allTeams: [currentTeam],
    currentTeam: currentTeam,
    currentPlayer: currentTeam.players[2],
  },
  reducers: {
    setCurrentTeam: (state, action: PayloadAction<Team>) => {
      state.currentTeam = action.payload
    },
    setCurrentPlayer: (state, action: PayloadAction<Player>) => {
      state.currentPlayer = action.payload
    },
    addTeam: (state, action: PayloadAction<Team>) => {
      state.allTeams = state.allTeams.concat(action.payload)
    },
    addPlayer: (state, action: PayloadAction<any>) => {
      let teamId: string = action.payload.teamId
      let player: Player = action.payload.player

      state.allTeams.forEach((team) => {
        if (team.id == teamId) {
          team.players.push(player)
        }
      })
    },
    removePlayer: (state, action) => {
      state.allTeams = action.payload
    },
    incrementScore: (state, action: PayloadAction<Team>) => {
      state.currentTeam.score += 1
    },
  },
})

export const { setCurrentPlayer, setCurrentTeam, addTeam, incrementScore } =
  teamsSlice.actions

export default teamsSlice.reducer
