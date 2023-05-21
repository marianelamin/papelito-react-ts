import { MapAndClone } from 'dao/firebase_helpers'

export class FirestoreTurn implements MapAndClone<FirestoreTurn> {
  id: string = '-1'

  constructor(
    public active: boolean,
    public round_number: number,
    public player_id: string,
    public papelitos_guessed: number,
    public timer_count: number
  ) {}

  toMap() {
    return {
      active: this.active,
      round_number: this.round_number,
      player_id: this.player_id,
      papelitos_guessed: this.papelitos_guessed,
      timer_count: this.timer_count,
    }
  }

  static clone(item: FirestoreTurn): FirestoreTurn {
    let c = new FirestoreTurn(
      item.active,
      item.round_number,
      item.player_id,
      item.papelitos_guessed,
      item.timer_count
    )

    c.id = item.id

    return c
  }
}
