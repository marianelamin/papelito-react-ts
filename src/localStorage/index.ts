class PapelitoLocalStorage {
  static readonly ROOM_ID = 'roomId'
  static readonly PLAYER_ID = 'playerId'

  static setRoomId(id: string) {
    localStorage.setItem(PapelitoLocalStorage.ROOM_ID, id)
  }

  static getRoomId() {
    return localStorage.getItem(PapelitoLocalStorage.ROOM_ID)
  }

  static removeRoomId() {
    localStorage.removeItem(PapelitoLocalStorage.ROOM_ID)
  }

  static setPlayerId(id: string) {
    localStorage.setItem(PapelitoLocalStorage.PLAYER_ID, id)
  }

  static getPlayerId() {
    return localStorage.getItem(PapelitoLocalStorage.PLAYER_ID)
  }

  static removePlayerId() {
    localStorage.removeItem(PapelitoLocalStorage.PLAYER_ID)
  }

  static clear() {
    localStorage.clear()
  }

  static getRoomAndPlayerId() {
    return {
      roomId: PapelitoLocalStorage.getRoomId() ?? '',
      myPlayerId: PapelitoLocalStorage.getPlayerId() ?? '',
    }
  }
}

export default PapelitoLocalStorage
