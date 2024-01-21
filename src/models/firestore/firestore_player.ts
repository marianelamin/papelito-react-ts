import { type Player } from '..'

export class FirestorePlayer {
  constructor(
    public is_admin: boolean,
    public name: string,
    public order: number,
    public team_id: string,
    public color_number: number,
    public has_submitted_papelitos: boolean
  ) {}

  static clone(item: FirestorePlayer): FirestorePlayer {
    const c = new FirestorePlayer(
      item.is_admin,
      item.name,
      item.order,
      item.team_id,
      item.color_number,
      item.has_submitted_papelitos
    )

    return c
  }

  static fromPlayer(player: Player) {
    return new FirestorePlayer(
      player.isAdmin,
      player.name,
      player.order,
      player.teamId,
      player.colorNumber,
      player.hasSubmittedPapelitos
    )
  }

  toPlayer(id: string): Player {
    return {
      id: id,
      name: this.name,
      isAdmin: this.is_admin,
      order: this.order,
      colorNumber: this.color_number,
      teamId: this.team_id,
      hasSubmittedPapelitos: this.has_submitted_papelitos
    }
  }
}
