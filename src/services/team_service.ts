import { Team, Player } from 'papelito-models'
import * as teamDao from '../dao/team_dao'

export const createTeam = (roomCode: string, teamName: string): Team => {
  console.log(`creating a team ${teamName}`)
  const team: Team = new Team()

  const newTeam: Team = teamDao.createTeam(roomCode, team)

  return newTeam
}

export const removeTeam = async (roomCode: string, teamId: string) => {
  console.log(`removing a team ${teamId}`)
  const team: Team = new Team()

  await teamDao.removeTeam(roomCode, teamId)
}

export default this
