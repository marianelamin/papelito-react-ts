import { Player } from 'papelito-models'

export class FirestorePlayer {
  id: string = '-1'

  constructor(
    public name: string,
    public order: number,
    public team_id: string
  ) {}

  static clone(item: FirestorePlayer): FirestorePlayer {
    let c = new FirestorePlayer(item.name, item.order, item.team_id)

    c.id = item.id

    return c
  }

  static fromPlayer(player: Player) {
    return new FirestorePlayer(player.name, player.order, player.teamId)
  }

  toPlayer(): Player {
    return {
      id: this.id,
      name: this.name,
      order: this.order,
      teamId: this.team_id,
    }
  }
}
