import { MapAndClone } from 'dao/firebase_helpers'
import { Player } from 'papelito-models'

export class FirestorePlayer implements MapAndClone<FirestorePlayer> {
  id: string = '-1'

  constructor(
    public name: string,
    public order: number,
    public team_id: string
  ) {}

  toMap() {
    return {
      name: this.name,
      order: this.order,
      team_id: this.team_id,
    }
  }

  static clone(item: FirestorePlayer): FirestorePlayer {
    let c = new FirestorePlayer(item.name, item.order, item.team_id)

    c.id = item.id

    return c
  }

  static fromPlayer(player: Player) {
    return new FirestorePlayer(player.name, player.order, player.teamId)
  }

  toPlayer(): Player {
    return new Player(this.id, this.name, false, this.order, this.team_id)
  }
}
