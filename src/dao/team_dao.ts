import * as collectionsRef from './collection_references'

import { Team } from '../papelito-models'
import { FirestoreTeam } from 'papelito-models/firestore'

export const getTeamDetails = (roomCode: string, teamId: string): Team => {
  console.log(`getting team details: ${teamId} in ${roomCode}`)
  const ref = collectionsRef.doc(collectionsRef.teamsRef(roomCode), teamId)

  let newTeam = new Team()
  newTeam.name = 'returned team'
  return newTeam
}

export const createTeam = (roomCode: string, team: Team): Team => {
  console.log(`creating a team`)
  const ref = collectionsRef.teamsRef(roomCode)

  let newTeam = new Team()
  newTeam.name = 'Team A'
  collectionsRef.addDoc(ref, FirestoreTeam.fromTeam(newTeam))

  return newTeam
}

export default this
