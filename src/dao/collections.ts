// collectionNames
const GAME_ROOMS = 'gameRooms'
const PAPELITOS = 'papelitos'
const PLAYERS = 'players'
const TEAMS = 'teams'
const TURNS = 'turns'

const collectionList = {
  rooms: GAME_ROOMS,
  papelitos: (roomCode: string) => `${GAME_ROOMS}/${roomCode}/${PAPELITOS}`,
  players: (roomCode: string) => `${GAME_ROOMS}/${roomCode}/${PLAYERS}`,
  teams: (roomCode: string) => `${GAME_ROOMS}/${roomCode}/${TEAMS}`,
  turns: (roomCode: string) => `${GAME_ROOMS}/${roomCode}/${TURNS}`
}

export default collectionList
