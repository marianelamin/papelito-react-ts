import { MapAndClone } from 'dao/firebase_helpers'
import { Papelito, Player } from 'papelito-models'

export class FirestorePapelito implements MapAndClone<FirestorePapelito> {
  id: string = '-1'

  constructor(
    public text: string,
    public player_id: string,
    public is_guessed: boolean,
    public is_in_bowl: boolean
  ) {}

  toMap() {
    return {
      text: this.text,
      player_id: this.player_id,
      is_guessed: this.is_guessed,
      is_in_bowl: this.is_in_bowl,
    }
  }

  static clone(item: FirestorePapelito): FirestorePapelito {
    let c = new FirestorePapelito(
      item.text,
      item.player_id,
      item.is_guessed,
      item.is_in_bowl
    )

    c.id = item.id

    return c
  }

  static fromPapelito(papelito: Papelito) {
    return new FirestorePapelito(
      papelito.text,
      papelito.author.id,
      papelito.guessed,
      papelito.inBowl
    )
  }

  toPapelito(): Papelito {
    return new Papelito(
      this.id,
      this.text,
      new Player(this.player_id, this.player_id),
      this.is_guessed,
      this.is_in_bowl
    )
  }
}
