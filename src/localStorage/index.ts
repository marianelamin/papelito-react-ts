class PapelitoLocalStorage {
  static setRoomId(id: string) {
    localStorage.setItem('roomId', id)
  }
  static getRoomId() {
    return localStorage.getItem('roomId')
  }

  static setPlayerId(id: string) {
    localStorage.setItem('playerId', id)
  }

  static getPlayerId() {
    return localStorage.getItem('playerId')
  }
}

export default PapelitoLocalStorage
