import {  GameSettings } from '.'

export class Room {
  constructor(
    public id: string = '-1',
    public code: string = '',
    public password: string = '',
    public settings: GameSettings = new GameSettings(),
    public hasGameStarted: boolean = false,
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
      room.settings,
      room.hasGameStarted,
      room.createdDate
    )
  }
}

