// collectionNames
const GAME_ROOMS = 'gameRooms'
const PAPELITOS = 'papelitos'
const PLAYERS = 'players'
const TEAMS = 'teams'
const ROUNDS = 'rounds'
const TURNS = 'turns'
const TIMER = 'timer'

const collectionList = {
  rooms: GAME_ROOMS,
  papelitos: (roomCode: string) => `${GAME_ROOMS}/${roomCode}/${PAPELITOS}`,
  players: (roomCode: string) => `${GAME_ROOMS}/${roomCode}/${PLAYERS}`,
  teams: (roomCode: string) => `${GAME_ROOMS}/${roomCode}/${TEAMS}`,
  rounds: (roomCode: string) => `${GAME_ROOMS}/${roomCode}/${ROUNDS}`,
  turns: (roomCode: string, roundId: string) =>
    `${GAME_ROOMS}/${roomCode}/${ROUNDS}/${roundId}/${TURNS}`,
  timer: (roomCode: string) => `${GAME_ROOMS}/${roomCode}/${TIMER}`
}

export default collectionList
