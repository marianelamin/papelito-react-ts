// collectionNames
const GAME_ROOMS = 'gameRooms'
const PAPELITOS = 'papelitos'
const PLAYERS = 'players'
const TEAMS = 'teams'

const collectionList = {
  rooms: GAME_ROOMS,
  papelitos: (roomCode: string) => `${roomCode}/${PAPELITOS}`,
  players: (roomCode: string) => `${GAME_ROOMS}/${roomCode}/${PLAYERS}`,
  teams: (roomCode: string) => `${roomCode}/${TEAMS}`,
}

export default collectionList
