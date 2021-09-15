const collections = {
  rooms: 'gameRooms',
  papelitos: (roomCode: string) => `${roomCode}/papelitos`,
  players: (roomCode: string) => `${roomCode}/'players`,
  teams: (roomCode: string) => `${roomCode}/teams`,
}

export default collections
