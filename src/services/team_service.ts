import { db } from '../dao'
import collections from '../dao/collections'
import { Team } from 'papelito-models'
import * as team_dao from '../dao/team_dao'

export const createteam = (roomCode: string, teamName: string): Team => {
  console.log(`creating a team ${teamName}`)
  const team: Team = new Team()

  const newTeam: Team = team_dao.createTeam(roomCode, team)

  return newTeam
}

export default this
