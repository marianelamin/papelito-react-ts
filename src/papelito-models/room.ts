import { MapAndClone } from 'dao/firebase_helpers'
import { ActiveTurn, GameSettings } from '.'

class Room implements MapAndClone<Room> {
  constructor(
    public id: string = '-1',
    public code: string = '',
    public password: string = '',
    public privateRoom: boolean = false,
    public settings: GameSettings = new GameSettings(),
    public activeTurn: ActiveTurn = new ActiveTurn(),
    public round: number = 1
  ) {}

  toString() {
    return this.toMap().toString()
  }

  toMap() {
    return {
      id: this.id,
      code: this.code,
      password: this.password,
      privateRoom: this.privateRoom,
      settings: this.settings,
      activeTurn: this.activeTurn,
      round: this.round,
    }
  }

  static clone(room: Room): Room {
    return new Room(
      room.id,
      room.password,
      room.code,
      room.privateRoom,
      room.settings,
      room.activeTurn,
      room.round
    )
  }

  static fromJson(map: Map<string, any>) {
    console.log(`This is the map: ${map}`)
    return new Room(
      map.get('id'),
      map.get('bowl'),
      map.get('password'),
      map.get('privateRoom'),
      map.get('settings'),
      map.get('round')
      // map.get('teams')
    )
  }
}

export default Room
