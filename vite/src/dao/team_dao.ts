import * as collectionsRef from './collection_references'

import { Team } from '../papelito-models'
import { FirestoreTeam } from '../papelito-models/firestore'

export const getTeamDetails = (roomCode: string, teamId: string): Team => {
  console.log(`getting team details: ${teamId} in ${roomCode}`)
  const ref = collectionsRef.doc(collectionsRef.teamsRef(roomCode), teamId)

  const newTeam = new Team()
  newTeam.name = 'returned team'
  return newTeam
}

// todo: doubt this shuld be done on the front end.
// selecting the teams should be a backend task, randomly grouping the players according to the room
// settings for teams
export const createTeam = (roomCode: string, team: Team): Team => {
  console.log('creating a team')
  const ref = collectionsRef.teamsRef(roomCode)

  const newTeam = new Team()
  newTeam.name = 'Team A'
  collectionsRef.addDoc(ref, FirestoreTeam.fromTeam(newTeam))

  return newTeam
}
export const removeTeam = async (roomCode: string, teamId: string) => {
  await collectionsRef.deleteDoc(collectionsRef.doc(collectionsRef.teamsRef(roomCode), teamId))
}

export default this
