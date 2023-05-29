import { MapAndClone } from 'dao/firebase_helpers'
import { Turn, GameSettings } from '.'

class Room implements MapAndClone<Room> {
  constructor(
    public id: string = '-1',
    public code: string = '',
    public password: string = '',
    public isPrivate: boolean = false,
    public settings: GameSettings = new GameSettings(),
    public activeTurn: Turn = new Turn(false), // remove in the future
    public round: number = 0,
    public createdDate: Date = new Date()
  ) {}

  toString() {
    return this.toMap().toString()
  }

  toMap() {
    return {
      id: this.id,
      code: this.code,
      password: this.password,
      privateRoom: this.isPrivate,
      settings: this.settings,
      activeTurn: this.activeTurn,
      round: this.round,
      createdDate: this.createdDate,
    }
  }

  static clone(room: Room): Room {
    return new Room(
      room.id,
      room.code,
      room.password,
      room.isPrivate,
      room.settings,
      room.activeTurn,
      room.round,
      room.createdDate
    )
  }

  static fromJson(map: Map<string, any>) {
    console.log(`This is the map: ${map}`)
    return new Room(
      map.get('id'),
      map.get('code'),
      map.get('password'),
      map.get('privateRoom'),
      map.get('settings'),
      map.get('activeTurn'),
      map.get('round'),
      map.get('createdDate')
    )
  }
}

export default Room
