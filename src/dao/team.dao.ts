import { fs, teamsRef } from './collection_references'

import { Team } from '../models'
import { FirestoreTeam } from '../models/firestore'

export const getTeamDetails = (roomCode: string, teamId: string): Team => {
  console.log(`getting team details: ${teamId} in ${roomCode}`)
  // const ref = fs.doc(fs.teamsRef(roomCode), teamId)

  const newTeam = new Team()
  newTeam.name = 'returned team'
  return newTeam
}

// todo: doubt this shuld be done on the front end.
// selecting the teams should be a backend task, randomly grouping the players according to the room
// settings for teams
export const createTeam = (roomCode: string, team: Team): Team => {
  throw new Error(`implement: ${JSON.stringify({ team })}`)
}
export const removeTeam = async (roomCode: string, teamId: string) => {
  await fs.deleteDoc(fs.doc(teamsRef(roomCode), teamId))
}

export default this
