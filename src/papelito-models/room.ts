import { Turn, GameSettings } from '.'

export class Room {
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
    return JSON.stringify(this)
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
}
