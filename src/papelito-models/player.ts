import { MapAndClone, convertToFromFirestore } from 'dao/firebase_helpers'

class Player implements MapAndClone<Player> {
  constructor(
    public id: string = '-1',
    public name: string = '',
    public activeInTurn: boolean = false,
    public order: number = 0,
    public teamId: string = '-1'
  ) {}

  toString() {
    return this.toMap().toString()
  }

  toMap() {
    return {
      id: this.id,
      name: this.name,
      activeInTurn: this.activeInTurn,
      order: this.order,
    }
  }

  static clone(player: Player): Player {
    return new Player(player.id, player.name, player.activeInTurn, player.order)
  }

  static fromJson(map: Map<string, any>) {
    return new Player(
      map.get('id'),
      map.get('name'),
      map.get('activeInTurn'),
      map.get('order')
    )
  }
}

export default Player
